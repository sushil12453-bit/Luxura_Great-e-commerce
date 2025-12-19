import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const width = window.innerWidth;

  // 🔹 Fetch products list
  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      {/* Loader */}
      {loading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
          <p>Hold On...</p>
        </div>
      )}

      <p className="text-lg font-semibold mb-2">All Products List</p>

      <div className="flex flex-col gap-3">
        {/* ---------- TABLE HEADER ---------- */}
        <div
          className="hidden md:grid grid-cols-[2fr_3fr_2fr_2fr_1fr_1fr]
          items-center py-2 px-3 bg-gray-100 text-sm font-semibold"
        >
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>SubCategory</p>
          <p>Price</p>
          <p className="text-center">Action</p>
        </div>

        {/* ---------- PRODUCT LIST ---------- */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_2fr_2fr_2fr_1fr_1fr]
            md:grid-cols-[2fr_3fr_2fr_2fr_1fr_1fr]
            items-center gap-2 py-2 px-3 border-b text-[12px] sm:text-sm"
          >
            {/* Image */}
            <img
              src={item.image?.[0]}
              alt={item.name}
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* Name */}
            <p className="truncate">{item.name}</p>

            {/* Category */}
            <p>
              {width > 680 ? item.category : item.category?.slice(0, 1)}
            </p>

            {/* SubCategory */}
            <p className="text-gray-600">
              {width > 680
                ? item.subCategory
                : item.subCategory?.slice(0, 1)}
            </p>

            {/* Price */}
            <p>
              {currency}
              {item.price}
            </p>

            {/* Delete */}
            <p
              onClick={() => deleteProduct(item._id)}
              className="cursor-pointer text-center font-bold hover:text-red-600"
            >
              X
            </p>
          </div>
        ))}

        {/* Empty state */}
        {!loading && list.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No products found
          </p>
        )}
      </div>
    </>
  );
};

export default List;
