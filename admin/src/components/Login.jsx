import React from 'react'
import '../index.css';
import { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSubmitHandler = async(e)=>{
       try{
          e.preventDefault();
          const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
          //we concatinate the api endpoint for admin to our post backend and pass the eamil,passwrod as req.body
          if(response.data.success){
            setToken(response.data.token);
          }
          else{
            toast.error(response.data.message)
          }
        }catch(error){
         console.log(error);
         toast.error(error.message);
       }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-gray-50  shadow px-8 py-16 max-w-md rounded-lg'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                  <p className='text-sm font-medium mb-2 text-gray-700'>Email Address</p>
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} 
                  type="email" placeholder='enter your email' required/>
                </div>
                <div className='mb-3 min-w-72'>
                  <p className='text-sm font-medium mb-2 text-gray-700'>Password</p>
                  <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='enter your password' required/>
                </div>
                <button className='mt-2 w-full py-2 px-4 rounded-md text-white
                 bg-black cursor-pointer' type='submit'>
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login