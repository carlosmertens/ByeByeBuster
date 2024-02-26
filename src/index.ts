import express from 'express';
// import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import { genresRouter } from './routes/genres';
import { customersRouter } from './routes/customers';

const app = express();

// Initialize Database
mongoose
  .connect('mongodb://localhost:27017/byeByeBuster')
  .then(() => console.log('connected to MongoDB...'))
  .catch(error => console.error(error));

// Middlewares
// app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);

// Port Listener
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`>> Server ready on port ${port}`));
