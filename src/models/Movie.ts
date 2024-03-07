import Joi from 'joi';
import { IMovie } from '../interfaces';
import { genreSchema } from './Genre';
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema<IMovie>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
  },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, min: 0, max: 50, default: 10 },
  dailyRentalRate: { type: Number, min: 0, max: 50, default: 20 },
});

const MovieModel = mongoose.model('movies', movieSchema);

function validateMovie(movie: IMovie) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    // genre: Joi.isSchema(genreSchema),
    genreId: Joi.string().required(),
  });

  return schema.validate(movie);
}

export { MovieModel, validateMovie };
