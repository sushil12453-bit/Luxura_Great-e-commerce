import React, { useState } from "react";
import { assets } from "../assets/assets";
import "../index.css";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {

  // ✅ FIX 1
  const [loading, setLoading] = useState(false);

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizez, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (sizez.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    if (!image1) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizez)); // ✅ FIX 2

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-3">

      {loading && (
        <p className="text-sm text-gray-500">Adding product...</p>
      )}

      {/* Upload Images */}
      <p>Upload Image</p>
      <div className="flex gap-2">
        {[image1, image2, image3, image4].map((img, i) => (
          <label key={i}>
            <img
              src={!img ? assets.upload_area : URL.createObjectURL(img)}
              className="w-20 aspect-square object-cover"
            />
            <input
              type="file"
              hidden
              onChange={(e) =>
                [setImage1, setImage2, setImage3, setImage4][i](e.target.files[0])
              }
            />
          </label>
        ))}
      </div>

      {/* Name */}
      <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Product name" required />

      {/* Description */}
      <textarea value={description} onChange={(e)=>setDescription(e.target.value)} required />

      {/* Price */}
      <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} min={1} />

      {/* Category */}
<div>
  <p className="text-sm mb-1">Category</p>
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="border px-3 py-2 w-full"
  >
    <option value="Men">Men</option>
    <option value="Women">Women</option>
    <option value="Kids">Kids</option>
  </select>
</div>


{/* Sub Category */}
<div>
  <p className="text-sm mb-1">Sub Category</p>
  <select
    value={subCategory}
    onChange={(e) => setSubCategory(e.target.value)}
    className="border px-3 py-2 w-full"
  >
    <option value="Topwear">Topwear</option>
    <option value="Bottomwear">Bottomwear</option>
    <option value="Winterwear">Winterwear</option>
  </select>
</div>




      // Sizes
      <div className="flex gap-2">
        {["S","M","L","XL","XXL"].map(size=>(
          <p
            key={size}
            onClick={()=>setSizes(prev =>
              prev.includes(size) ? prev.filter(s=>s!==size) : [...prev,size]
            )}
            className={`${sizez.includes(size) ? "bg-pink-200" : "bg-gray-200"} px-3 cursor-pointer`}
          >
            {size}
          </p>
        ))}
      </div>

      // Bestseller 
      <label>
        <input type="checkbox" checked={bestseller} onChange={()=>setBestseller(p=>!p)} />
        Bestseller
      </label>

      


      // ✅ SINGLE SUBMIT BUTTON 
      <button disabled={loading} className="bg-black text-white px-4 py-2">
        {loading ? "Adding..." : "ADD PRODUCT"}
      </button>

    </form>
  );
};

export default Add;
