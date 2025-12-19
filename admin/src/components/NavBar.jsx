import React from 'react'
import {assets} from '../assets/assets.js'

const NavBar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
      <div className=''>  
        <img src={assets.logo} alt="" className='w-[max(10%,80px)]'/>
        <p className='text-gray-700 translate-y-[-12px]'>Admin Panel</p>
      </div>
        <button onClick={()=>setToken('')} className='bg-black text-white px-5 py-2
        sm:px-7 sm:py-2 rounded-full hover:bg-[#161616] cursor-pointer'>
            Logout
        </button>
    </div>
  )
}

export default NavBar