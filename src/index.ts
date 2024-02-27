import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { genresRouter } from './routes/genres';
import { customersRouter } from './routes/customers';

// Initialize App
const app = express();
const port = process.env.PORT || 8081;

// Initialize Database
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log('connected to MongoDB...'))
  .catch(error => console.error(error));

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);

// Port Listener
app.listen(port, () => console.log(`>> Server ready on port ${port}`));
