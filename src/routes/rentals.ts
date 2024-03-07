import { controller } from '../controllers/rentals';
import { Router } from 'express';

export const rentalsRouter = Router();

rentalsRouter
  .route('/')
  .get(controller.getAllRentals)
  .post(controller.postNewRental);

rentalsRouter.get('/:id', controller.getRentalById);
