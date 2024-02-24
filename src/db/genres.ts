import mongoose from 'mongoose';
import { IGenre } from '../routes/genres';

// Create Schema for a new Collection
const genreSchema = new mongoose.Schema<IGenre>({
  name: { type: String, required: true, minLength: 3, maxLength: 25 },
  isActive: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

// Compile and export schema into a model
export const GenreModel = mongoose.model<IGenre>('Genre', genreSchema);
