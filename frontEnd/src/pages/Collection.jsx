import React,{useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const {products,search,showSearch} = useContext(ShopContext);
  const [showFilters,setShowFilters] =  useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relevant');

  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prevCategory=>prevCategory.filter(item=>item !== e.target.value))
    }else{
      setCategory(prevCategory=>[...prevCategory,e.target.value])
    }
  }

  const togglesubCategory = (e) =>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prevCategory=>prevCategory.filter(item=>item !== e.target.value))
    }
    else{
      setSubCategory(prevCategory=>[...prevCategory,e.target.value]);
    }
  }

  const applyFilters = ()=>{
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item=>category.includes(item.category))
    }
    if(subCategory.length>0){
      productsCopy = productsCopy.filter(item=>subCategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy);
  }

  const sortProduct = ()=>{
    let filteredProduct = filterProducts.slice(); 
    console.log(filterProducts);
    // makes copy of already filterProduct array of useState() we define
    switch(sortType) {
      case 'low-high':
        setFilterProducts(filteredProduct.sort((a,b)=>(a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(filteredProduct.sort((a,b)=>(b.price - a.price)));
        break;
      default:
        applyFilters();
        break;
    }
  }
  

  useEffect(()=>{
    applyFilters();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>


     <div className='min-w-60'>
      <p className='my-2 text-xl flex items-center cursor-pointer gap-2' onClick={()=>setShowFilters(!showFilters)}>FILTERS
        <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilters ? 'rotate-90':''} transition-all`}/>
      </p>
  
      <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters?'':'hidden'} sm:block transition-all`}>
        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2 '>
            <input type="checkbox" name="" id="" className='w-3 cursor-pointer' value={'Men'} onChange={toggleCategory}/>MEN
          </p>
          <p className='flex gap-2 '>
            <input type="checkbox" name="" id="" className='w-3 cursor-pointer' value={'Women'} onChange={toggleCategory}/>WOMEN
          </p>
          <p className='flex gap-2 '>
            <input type="checkbox" name="" id="" className='w-3 cursor-pointer' value={'Kids'} onChange={toggleCategory}/>KIDS
          </p>
        </div>
      </div>
    
      <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilters?'':'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>TYPES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2 '>
            <input type="checkbox" name="" id="" className='w-3 cursor-pointer' value={'Topwear'} onChange={togglesubCategory}/>TOP WEAR
          </p>
          <p className='flex gap-2 '>
            <input type="checkbox" name="" id="" className='w-3 cursor-pointer' value={'Bottomwear'} onChange={togglesubCategory}/>BOTTOM WEAR
          </p>
          <p className='flex gap-2 '>
            <input type="checkbox" name="" id="" className='w-3 cursor-pointer' value={'Winterwear'}onChange={togglesubCategory}/>WINTERWEAR
          </p>
        </div>
      </div>
     </div>

    

     <div className='flex-1'>
      <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={'ALL'} text2={"COLLECTIONS"}/>
        
        <select name="" id="" className='border border-gray-300 text-sm px-2 outline-none cursor-pointer' value={sortType} 
        onChange={(e)=>setSortType(e.target.value)}>
          <option value="relevant">Sort by: Relevance</option>
          <option value="low-high">Sort by: Low-High</option>
          <option value="high-low">Sort by: High-Low</option>
        </select>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.length>0?
            filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            )):<p className='lg:text-3xl md:text-center text-start w-full'>Sorry No results found for your query</p>
          }
      </div>
     </div>

    </div>
  )
}

export default Collection