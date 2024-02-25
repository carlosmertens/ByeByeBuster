import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { genreRouter } from './routes/genres';

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
app.use('/api/genres', genreRouter);

// Port Listener
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`>> Server ready on port ${port}`));
