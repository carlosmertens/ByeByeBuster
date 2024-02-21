import express from 'express';
import mongoose from 'mongoose';
import genres from './routes/genres.js';

const app = express();

// Initialize Database
mongoose
  .connect('mongodb://localhost:27017/byeByeBuster')
  .then(() => console.log('connected to MongoDB...'))
  .catch(error => console.error(error));

// Middlewares
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/genres', genres);

// Port Listener
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`>> Server ready: port ${port}`));
