import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for API calls

import campaignImage from "../assets/homeimg.png";

const HomePage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      console.log("Fetching products from API...");
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data.data); // Ensure this matches the API response structure
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("image", productData.image);

    try {
      const response = await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product added successfully:", response.data);

      // Reset the form fields
      setProductData({
        name: "",
        description: "",
        price: "",
        image: null,
      });

      // Refresh the product list
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
    }
  };

  const handleCampaign = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/email", {
        method: "POST",
      });
  
      const data = await response.json();
      console.log("Campaign Triggered:", data);
      alert("Email is email after 1 minutes!");
    } catch (err) {
      console.error("homepage.jsx Error triggering campaign:", err);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-2/3 flex flex-col items-center">
          <div className="relative w-72 h-72 mb-6">
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              }}
            >
              <img
                src={campaignImage}
                alt="Email Campaign"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-lg text-gray-700 text-center">
            Streamline your email campaigns with our powerful campaign management tool. Reach your audience effectively and track your results in real-time.
          </p>
        </div>

        <div className="w-full md:w-1/3 bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Manage Your Campaigns
          </h2>
          <form className="space-y-4" encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="w-full border border-gray-300 p-2 rounded"
              value={productData.name}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Product Description"
              className="w-full border border-gray-300 p-2 rounded"
              value={productData.description}
              onChange={handleChange}
            ></textarea>
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              className="w-full border border-gray-300 p-2 rounded"
              value={productData.price}
              onChange={handleChange}
            />
            <input
              type="file"
              name="image"
              className="w-full border border-gray-300 p-2 rounded"
              onChange={handleFileChange}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4 mt-4"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>

      <div className="w-full mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Product List
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 shadow-md rounded-lg">
              <img
                src={`http://localhost:5000/${product.image}`} 
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-blue-600 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full mt-8 flex justify-center">
        <button
          onClick={handleCampaign}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Trigger Campaign
        </button>
      </div>
    </div>
  );
};

export default HomePage;
