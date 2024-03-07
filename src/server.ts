import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { log } from './logs';
import { logger } from './middlewares/logger';
import { genresRouter } from './routes/genres';
import { customersRouter } from './routes/customers';
import { moviesRouter } from './routes/movies';
import { rentalsRouter } from './routes/rentals';

// Initialize App
const app = express();
const port = process.env.PORT || 8081;

// Initialize Database connection
mongoose
  .connect(process.env.ATLAS_URI as string)
  .then(() => log.db('MongoDB connected'))
  .catch(error => console.error(error));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger);

// Routes
app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/rentals', rentalsRouter);
// Port Listener
app.listen(port, () => log.server(`Ready and listening on port ${port}`));
