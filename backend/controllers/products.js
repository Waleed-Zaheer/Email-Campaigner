import Product from "../models/Product.js"; // Use ES module import

// Helper function to fetch products
export const fetchProducts = async () => {
  try {
    const products = await Product.find(); // Fetch all products
    return products;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw new Error("Failed to fetch products");
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await fetchProducts(); // Use the helper function
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// Create a product
export const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file?.path || "no-photo.jpg"; // Handle file upload

  try {
    const product = await Product.create({
      name,
      description,
      price,
      image,
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
