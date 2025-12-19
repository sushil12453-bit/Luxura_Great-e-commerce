import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
   <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-8 sm:gap-14 my-10 mt-40 text-sm footer">
      <div>
        <img src={assets.logo} alt="" className='w-20 sm:mb-3 sm:w-32'/>
      </div>

      <div>
        <p className='text-xl font-medium mb-3 text-center sm:text-start sm:mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600 text-center  sm:text-start'>
            <Link to='/'><li>Home</li></Link>
            <Link to='/about'><li>About us</li></Link>
            <Link to='/contact'><li>Contact</li></Link>
            <li>Privacy Policy</li>
        </ul>
      </div>

      <div>
        <p className='text-xl text-center sm:text-start font-medium mb-3 sm:mb-5'>GET IN TOUCH</p>
        <ul className='fle flex-col text-center sm:gap-1 text-gray-600'>
            <li>+91-212-456-7890</li>
            <li className='cursor-pointer'>baliyanlucky85@gmail.com</li>
        </ul>
      </div>

      <div className='w-full border-t'>
        <p className='py-5 text-sm text-center'>
            Copyright 2024@ Luxor.com - All rights reserved.
        </p>
      </div>
   </div>
  )
}

export default Footer