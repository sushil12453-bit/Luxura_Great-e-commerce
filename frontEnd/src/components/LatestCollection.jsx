import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {

  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {

    // ✅ 1. BAGS FILTER (spelling fix)
    const bagProducts = products.filter(
      (item) => item.subCategory === "Bags"
    )

    // ✅ 2. Agar bags available hain → wahi dikhao
    if (bagProducts.length > 0) {
      setLatestProducts(bagProducts.slice(0, 10))
    } else {
      // warna normal latest products
      setLatestProducts(products.slice(0, 10))
    }

  }, [products])

  //console.log("LATEST PRODUCTS 👉", latestProducts)

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection












/*import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {


  const {products} = useContext(ShopContext);
  const [latestProducts,setLatestProducts] = useState([]);

  const bags = products.filter(
    (item) => item.subCategry === "Bags"
  );

  useEffect(()=>{
    setLatestProducts(products.slice(0,10));
  },[products])

  console.log("PRODUCTS FROM CONTEXT 👉", products);


  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident inventore illo quam.
            </p>
        </div>

      

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((item,index)=>(
                   <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection;*/