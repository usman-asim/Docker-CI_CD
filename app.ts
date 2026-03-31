import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db';
import authRoutes from './src/routes/authRoutes';
import productRoutes from './src/routes/productRoutes';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Ecommerce API running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
