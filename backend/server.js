import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; 
import cors from 'cors';
import path from 'path';

import sendEmail_Route from './routes/sendEmail_Route.js';
import recipientRoutes from './routes/recipient.js';
import productRoutes from './routes/product.js';

dotenv.config({ path: './config/config.env' });
connectDB();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors())
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use('/api/recipients', recipientRoutes);
app.use('/api/products', productRoutes);
app.use('/api/email', sendEmail_Route);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

export default app;

