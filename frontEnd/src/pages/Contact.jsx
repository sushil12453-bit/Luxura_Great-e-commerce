import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className='my-10 flex flex-col justify-center
      md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt="" className='w-full 
        md:max-w-[480px]' />
        <div className='flex flex-col justify-center items-start
        gap-6 leading-5'>
          <p className='font-semibold text-xl'>
            Our Store
          </p>
          <p className='text-gray-500'>
          Galgotias University <br />Gautam Budh Nagar,
          Greater Noida,<br />Uttar Pradesh,India
          </p>
          <p className='text-gray-600'>
            +91 9759940199
            <br />
            baliyanlucky85@gmail.com
          </p>
          <p className='font-semibold text-xl'>
            Careers at Forever
          </p>
          <p className='text-gray-500'>
            Learn more about Me..
          </p>
          <button className='border-3 border-black px-8 py-4 text-sm
          hover:bg-black hover:text-white transition-all duration-300 ease-in-out
          active:scale-95 cursor-pointer'>
            <a href="https://www.instagram.com/luckybaliyan3507/" target='_blank'>Explore My Works</a>
          </button>
        </div>
      </div>

      <NewsLetterBox  />
    </div>
  )
}

export default Contact