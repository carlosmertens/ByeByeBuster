import mongoose from 'mongoose';
import { IGenre } from '../routes/genres';

// Create Schema for a new Collection
const genreSchema = new mongoose.Schema<IGenre>({
  name: { type: String, required: true, minLength: 3, maxLength: 25 },
  isActive: Boolean,
  date: { type: Date, default: Date.now },
});

// Export model created from the schema
export const GenreModel = mongoose.model<IGenre>('Genre', genreSchema);
