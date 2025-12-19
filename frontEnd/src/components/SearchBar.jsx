import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search,setSearch,showSearch,setShowSearch} = useContext(ShopContext);
    //Logic for hidding the searchBar when navigate to other page using useLocation hook...
    const [visible,setVisible] = useState(false);

    const location = useLocation();

    useEffect(()=>{
        if(location.pathname.includes('collection')){
           setVisible(true);
        }
        else{
            setVisible(false);
        }
    },[location])

  return showSearch && visible ? (
    <div className='border-b bg-gray-0 text-center flex items-center justify-center'>
        <div className='inline-flex items-center justify-center relative border overflow-hidden border-gray-400  px-5 py-1 my-5 mx-3 gap-1 rounded-full w-3/4
        sm:w-1/2'>
            <input className='flex-1 outline-none bg-inherit text-sm rounded-xs px-3 py-2' type="text" placeholder='Search' 
            value={search} onChange={(e)=>setSearch(e.target.value)}
            />
            <img src={assets.search_icon} alt="" className='w-5' />
        </div>
        <div className="cross" onClick={()=>setShowSearch(false)}>
            <img src={assets.cross_icon} className='w-3 cursor-pointer' alt="" />
        </div>
    </div>
  ):null
}

export default SearchBar