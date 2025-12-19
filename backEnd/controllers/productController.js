import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
// adding a new product
const addProduct = async (req, res) => {


  try {

    //console.log("📦 BODY 👉", req.body);
    //console.log("🖼 FILES 👉", req.files);



    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const images = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
    ].filter(Boolean);

    if (!images.length) {
      return res.json({ success: false, message: "At least one image required" });
    }

    
    //console.log("Uploading with key 👉", process.env.CLOUDINARY_API_KEY);


    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.
          upload(file.path, {
          folder: "products",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" || bestseller === true,
      sizes: sizes ? JSON.parse(sizes) : [],
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();
    //console.log("✅ PRODUCT SAVED IN DATABASE");



    res.json({ success: true, message: "Product added successfully" });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//fucntion for list products
const listProducts = async(req,res)=>{
    try{

       const products = await productModel.find({})

      //console.log("📃 PRODUCTS COUNT 👉", products.length);


       res.json({success:true,products})

    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}



//remove products
const removeProducts = async(req,res)=>{
    try{

        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:'product removed'});

    }catch(error){

        res.json({success:false,message:error.message});

    }
}

//for single product info

const singleProduct = async(req,res)=>{
   try{

      const { productId } = req.body;
      const product = await productModel.findById(productId);
      res.json({success:true,product});

   }catch(error){

    res.json({success:false,message:error.message});

   }
}

export {listProducts,addProduct,removeProducts,singleProduct};