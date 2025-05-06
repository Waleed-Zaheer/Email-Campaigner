import express from "express";
import multer from "multer";
import { getProducts, createProduct } from "../controllers/products.js"; // Added .js extension

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.route("/").get(getProducts).post(upload.single("image"), createProduct);

export default router;
