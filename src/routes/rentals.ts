import { controller } from '../controllers/rentals';
import { Router } from 'express';
import { auth } from '../middlewares/auth';

export const rentalsRouter = Router();

rentalsRouter
  .route('/')
  .get(controller.getAllRentals)
  .post(auth, controller.postNewRental);

rentalsRouter.get('/:id', controller.getRentalById);
