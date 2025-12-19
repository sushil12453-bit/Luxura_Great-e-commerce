import React, { useState } from 'react'
import { toast } from 'react-toastify';

const NewsLetterBox = ({color='bg-pink-100'}) => {
    const [value,setValue] = useState('');
    const onsubmitHandler = (e)=>{
        e.preventDefault();
        setValue('');
        toast.success('Subscribed');
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <form action="" onSubmit={onsubmitHandler} className={`w-full flex sm:w-1/2 items-center gap-3 mx-auto my-6 ${color}  pl-3`}>
            <input type="email" placeholder='Enter your email' className='
            w-full sm:flex-1 outline-none' required value={value} onChange={(e)=>setValue(e.target.value)}/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4 cursor-pointer'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox;