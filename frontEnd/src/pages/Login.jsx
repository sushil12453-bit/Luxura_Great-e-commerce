import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Login = () => {
  const [currentState,setCurrentState] = useState('Login');
  const {token,setToken,navigate,backendUrl} = useContext(ShopContext);
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    console.log(backendUrl);
    try{
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
          toast.success('Successfully Signed up')
          currentState('Login');
        }
        else{
          toast.error(response.data.message);
        }
      }
      else{

        const response = await axios.post(backendUrl + '/api/user/login',{email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
          toast.success("Sucessfully Logged in")
        }
        else{
          toast.warn(response.data.message+"Please Sing Up Here");
          setCurrentState('Sign Up')
        }
      }
    }catch(error){
      console.log(error.message);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='font-[Primary] text-3xl font-medium'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
        </div>
        {currentState === 'Login'?'':
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Name' required/>}
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Email' required/>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password"  className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Password'required/>
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='text-gray-600 cursor-pointer hover:text-gray-900 transition'>
            Forgot your password?
          </p>
          {
            currentState === 'Login'
            ?<p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer
            '>
              Create account
            </p>
            :<p onClick={()=>setCurrentState('Login')} className='text-gray-600 
            cursor-pointer'>
              Login here
            </p>
          }
        </div>
        <button type='submit'  className='bg-black text-white font-light px-8 py-2 
        mt-4 cursor-pointer active:scale-95'>{
          currentState === 'Login'?'Sign In':'Sign Up'
        }
        </button>
    </form>
  )
}

export default Login;