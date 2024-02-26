import express from 'express';
// import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import { genresRouter } from './routes/genres';
import { customersRouter } from './routes/customers';

const app = express();

// Initialize Database

const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@cluster0.bznfdet.mongodb.net/bye_bye_buster?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(uri)
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
