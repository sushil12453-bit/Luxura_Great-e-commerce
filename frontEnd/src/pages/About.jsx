import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="" className='w-full md:max-w-[450px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
           <p>
            At Luxora, we believe shopping should be more than just buying – it should be an experience. 
            Our curated collection brings together premium-quality products that blend style, comfort, and durability. 
            Every piece is handpicked to ensure you get nothing but the best.
           </p>
           <p>
            We focus on building trust by offering products that truly add value to your life. 
            With secure shopping, fast delivery, and dedicated support, we make every purchase special. 
            At Luxora, you deserve nothing less than luxury.
           </p>
           <b className='text-gray-800 text-3xl'>Our Mission</b>
           <p>
            To redefine online shopping by offering premium, stylish, 
            and durable products that inspire confidence and elevate 
            everyday living. We aim to deliver luxury, trust, and 
            satisfaction in every purchase.
           </p>
        </div>
      </div>
       <div className='text-xl py-4'>
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 gap-3'>
          <div className='border-0 shadow px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-pink-50'>
            <b className='text-xl '>Quality Assurance:</b>
            <p className='text-gray-600'>
              We contineously select and vet each product to ensure it meets
              meets our stringent quality standards.
            </p>
          </div>
          <div className='border-0 shadow bg-pink-50 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
            <b className='text-xl'>Convenience:</b>
            <p className='text-gray-600'>
              With our user-friendly interface and hassle-free odering process,
              shopping is user-friendly and conveniant.
            </p>
          </div>
          <div className='border-0 shadow bg-pink-50 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className='text-xl'>Exceptional Customer Services:</b>
            <p className='text-gray-600'>
              Our team of dedicated professionals is here to 
              assist you the way,ensuring your satisfaction is
              our top priority.
            </p>
          </div>
        </div>

        <NewsLetterBox color='bg-gray-100'/>
    </div>
  )
}

export default About