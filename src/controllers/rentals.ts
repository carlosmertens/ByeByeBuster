import { Request, Response } from 'express';
import { log } from '../logs';
import { RentalModel, validateRental } from '../models/Rental';
import { CustomerModel } from '../models/Customer';
import { MovieModel } from '../models/Movie';
import mongoose from 'mongoose';

async function getAllRentals(req: Request, res: Response) {
  try {
    const rentals = await RentalModel.find().sort('-dateOut');
    res.send(rentals);
  } catch (err) {
    log.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

async function postNewRental(req: Request, res: Response) {
  try {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.message);

    // TODO: Refactor objectId validation - joi-objectid
    if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
      return res.status(400).send('Invalid customer.');
    const customer = await CustomerModel.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    // TODO: Refactor objectId validation
    if (!mongoose.Types.ObjectId.isValid(req.body.movieId))
      return res.status(400).send('Invalid movie.');
    const movie = await MovieModel.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    if (movie.numberInStock === 0)
      return res.status(400).send('Movie not in stock.');

    let rental = new RentalModel({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    // TODO:
    // Create a transaction to save rental and movie as a unit
    // Look into fawn or mongoose transactions
    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);
  } catch (err) {
    log.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

async function getRentalById(req: Request, res: Response) {
  const rental = await RentalModel.findById(req.params.id);

  if (!rental) return res.status(404).send('Id was not found.');

  res.send(rental);
}

export const controller = { getAllRentals, postNewRental, getRentalById };
