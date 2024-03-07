import mongoose from 'mongoose';
import Joi from 'joi';
import { IGenre } from '../interfaces';

// Create Schema for a new Collection
export const genreSchema = new mongoose.Schema<IGenre>({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 25,
  },
});

// Compile and export schema into a model
export const GenreModel = mongoose.model<IGenre>('genres', genreSchema);

// Function to validate Genre schema
export function validateGenre(genre: IGenre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
  });

  return schema.validate(genre);
}
