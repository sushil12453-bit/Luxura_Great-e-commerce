import React, { useContext, useState } from 'react'
import {assets} from '../assets/frontend_assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const NavBar = () => {
    const [visible,setVisible] = useState(false);
    const [block,setBlock] = useState(false);
    const { setShowSearch, getCartCount,cartItems,navigate,token,setToken,setCartItems } = useContext(ShopContext);

    const logout = ()=>{
      if(!token){
        return null;
      }
        toast.success("Logged Out")
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    }

  return (
    <nav className='flex items-center justify-between py-5 font-medium'>
        <Link to='/'><img src={assets.logo} alt="" className='w-16  sm:w-26 lg:w-28'/></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className={`flex flex-col items-center gap-1`}>
              <p>Home</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
             <NavLink to='/collection' className={`flex flex-col items-center gap-1`}>
              <p>Collections</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
             <NavLink to='/about' className={`flex flex-col items-center gap-1`}>
              <p>About</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
             <NavLink to='/contact' className={`flex flex-col items-center gap-1`}>
              <p>Contact</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
        </ul>

        <div className='flex items-center gap-6'>
            <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black scale-50 sm:scale-100'>Orders</p>
            <p className={` ${!token?'hidden':''}cursor-pointer scale-50 sm:scale-100 bg-black text-white px-3 py-2 rounded text-sm hover:bg-gray-800`} onClick={logout}>Logout</p>
            <Link to='/collection'><img src={assets.search_icon} className='w-5 scale-150 sm:scale-100 cursor-pointer' alt="" onClick={()=>setShowSearch(true)}/></Link>
            <div className='group relative'>
                <img onClick={()=> token ? null:navigate('/login')} src={assets.profile_icon} className='w-5 scale-150 sm:scale-100 cursor-pointer' alt="" />
                {token && 
                  <div className={`hidden absolute dropdown-menu right-0 pt-4 h-max`}>
                    <div className="flex flex-col gap-2 py-3 px-5 w-36 bg-slate-100 text-gray-500 rounded">
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                    </div>
                </div>
                }
            </div>
            <Link to='/cart' className='relative'>
               <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
               <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                {getCartCount(cartItems.size)}
               </p>
            </Link>
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        </div>

        {/* side bar menu for small screens */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-black transition-all
            ${visible?'w-full':'w-0'} h-[896vh] overflow-hidden z-50`}>
                <div onClick={()=>setVisible(false)} className='flex flex-col text-white'>
                    <div className="flex items-center gap-4 p-3 cursor-pointer">
                        <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180' />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className={`py-2 pl-6  hover:text-black transition-all relative capitalize nav-link`} to='/'><p>HOME</p></NavLink>
                    <NavLink onClick={()=>setVisible(false)} className={`py-2 pl-6  hover:text-black transition-all relative capitalize nav-link`} to='/collection'><p>COLLECTIONS</p></NavLink>
                    <NavLink onClick={()=>setVisible(false)} className={`py-2 pl-6  hover:text-black transition-all relative capitalize nav-link`} to='/about'><p>ABOUT</p></NavLink>
                    <NavLink onClick={()=>setVisible(false)} className={`py-2 pl-6  hover:text-black transition-all relative capitalize nav-link`} to='/contact'><p>CONTACT</p></NavLink>
                </div>
            </div>
    </nav>
  )
}

export default NavBar