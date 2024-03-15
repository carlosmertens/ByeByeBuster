import mongoose from 'mongoose';
import { log } from '../logs';

/**
 * Function to start database connection.
 * Use mongoose to connect to MongoDB Atlas cloud
 */
export function startDB() {
  mongoose
    .connect(process.env.ATLAS_URI as string)
    .then(() => log.db('MongoDB connected'))
    .catch(error => log.error(error));
}
