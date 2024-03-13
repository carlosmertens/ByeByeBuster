import Joi from 'joi';
import mongoose from 'mongoose';
import { TRental } from '../types';

const rentalSchema = new mongoose.Schema<TRental>({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlenght: 5,
        maxlength: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const RentalModel = mongoose.model('rental', rentalSchema);

function validateRental(rental: { customerId: string; movieId: string }) {
  // TODO: Find a solution to check for objectId - joi-objectid
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });

  return schema.validate(rental);
}

export { RentalModel, validateRental };
