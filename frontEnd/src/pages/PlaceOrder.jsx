import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import CardTotal from '../components/CardTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [method,setMethod] = useState('cod');
  const {navigate,backendUrl,token,cartItems,getCartAmount,setCartItems,getCartItems,delivery_fee,products} = useContext(ShopContext);

  const [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:'',
  })

  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data =>({...data,[name]:value}))

  }

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try{

      let orderItems = [];

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

     let orderData = {
      address:formData,
      items:orderItems,
      amount:getCartAmount() + delivery_fee
     }

    switch(method){
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}});
          console.log(response.data);
          if(response.data.success){
            setCartItems({});
            navigate('/orders')
          }
          else{
            toast.error(response.data.message);
            navigate('/login')
          }
        break;

        case'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}});
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data;
            window.location.replace(session_url);
          }else{
            toast.error(responseStripe.data.message)
          }
        break;

        default:
        break;
    }

    }catch(error){
      console.log(error.message);
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col  justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]
    border-t'>
      {/*left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl my-3 sm:text-2xl'>
            <Title text1={"DELIVIRY"} text2={"INFORMATION"}/>
          </div>
          <div className='flex gap-3'>
             <input type="text"placeholder='First name' className='border border-gray-300 rounded py-1.5 
             px-3.5 w-full outline-none' value={formData.firstName} onChange={onChangeHandler} name='firstName'/>
             <input value={formData.lastName} onChange={onChangeHandler} name='lastName' type="text"placeholder='Last name' className='border border-gray-300 rounded py-1.5 
             px-3.5 w-full outline-none' required/>
          </div>
          <input type="emial" placeholder='Email address' className='border border-gray-300 rounded py-1.5 
          px-3.5 w-full outline-none' value={formData.email} onChange={onChangeHandler} name='email'required/>
          <input type="emial" placeholder='Street' className='border border-gray-300 rounded py-1.5 
          px-3.5 w-full outline-none' value={formData.street} onChange={onChangeHandler} name='street'required/>
          <div className='flex gap-3'>
             <input type="text"placeholder='City' className='border border-gray-300 rounded py-1.5 
             px-3.5 w-full outline-none' />
             <input type="text"placeholder='State' className='border border-gray-300 rounded py-1.5 
             px-3.5 w-full outline-none' value={formData.state} onChange={onChangeHandler} name='state' required/>
          </div>
           <div className='flex gap-3'>
             <input type="number" placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 
             px-3.5 w-full outline-none' value={formData.zipcode} onChange={onChangeHandler} name='zipcode'required/>
             <input type="text"placeholder='Country' className='border border-gray-300 rounded py-1.5 
             px-3.5 w-full outline-none' value={formData.country} onChange={onChangeHandler} name='country'required/>
          </div>
          <input type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 
          px-3.5 w-full outline-none' value={formData.phone} onChange={onChangeHandler} name='phone'required/>
      </div>
      {/*Right Side */}
      <div className='mt-8 min-w-80'>
        <CardTotal />
      </div>

      <div className='mt-12'>
        <Title text1={'PAYMENT'} text2={'METHOD'} />
        {/*Payment Method Selection */}
        <div className='flex flex-col lg:flex-row gap-2'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3  border border-gray-400 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5  rounded-full brightness-90 ${method === 'stripe'?'bg-green-400':''}`}></p>
              <img src={assets.stripe_logo} alt="" className='h-5 mx-4' />
            </div>
            <div onClick={()=>toast.warn('Razorpay service is not available currently!')} className='flex items-center gap-3 border border-gray-400 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 brightness-90  rounded-full ${method === 'razorpay'?'bg-green-400':''}`}></p>
              <img src={assets.razorpay_logo} alt="" className='h-5 mx-4 opacity-25 cursor-not-allowed' />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border border-gray-400 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 brightness-90   rounded-full ${method === 'cod'?'bg-green-400':''}`}></p>
              <p className='text-gray-500 font-medium text-sm mx-4'>Cash on delivery</p>
            </div>
        </div>
        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white px-16 py-3 text-sm
          active:scale-95 cursor-pointer'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder