import Joi from 'joi';
import { TMovie } from '../types';
import { genreSchema } from './Genre';
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema<TMovie>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
  },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, min: 0, max: 100, default: 10 },
  dailyRentalRate: { type: Number, min: 10, max: 50, default: 10 },
});

const MovieModel = mongoose.model('movies', movieSchema);

function validateMovie(movie: TMovie) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100),
    dailyRentalRate: Joi.number().min(10).max(50),
  });

  return schema.validate(movie);
}

export { MovieModel, validateMovie };
