import Joi from 'joi';
import { IMovie } from '../interfaces';
import { genreSchema } from './Genre';
import mongoose from 'mongoose';

const MoviesModel = mongoose.model(
  'movies',
  new mongoose.Schema<IMovie>({
    title: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 50,
      required: true,
    },
    // genre: { type: mongoose.Schema.Types.ObjectId, ref: 'GenreModel' },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, default: 0 },
    dailyRentalRate: { type: Number, default: 0 },
  })
);

function validateMovie(movie: IMovie) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
  });
}

export { MoviesModel, validateMovie };
