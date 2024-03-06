import { Request, Response } from 'express';
import { log } from 'logs';
import { RentalModel, validateRental } from '../models/Rental';
import { CustomerModel, validateCustomer } from '../models/Customer';
import { MovieModel, validateMovie } from '../models/Movie';

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

    const customer = await CustomerModel.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

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
      mvie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });
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
