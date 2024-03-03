import mongoose from 'mongoose';
import Joi from 'joi';
import { IGenre } from '../interfaces';

// Create Schema for a new Collection
export const genreSchema = new mongoose.Schema<IGenre>({
  name: { type: String, required: true, minLength: 3, maxLength: 25 },
  isActive: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

// Compile and export schema into a model
export const GenreModel = mongoose.model<IGenre>('Genre', genreSchema);

// Function to validate Genre schema
export function validateGenre(genre: IGenre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
  });

  return schema.validate(genre);
}
