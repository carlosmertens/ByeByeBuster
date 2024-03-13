import { Router } from 'express';
import { controller } from '../controllers/movies';
import { auth } from '../middlewares/auth';

export const moviesRouter = Router();

moviesRouter
  .route('/')
  .get(controller.getAllMovies)
  .post(auth, controller.postNewMovie);

moviesRouter
  .route('/:id')
  .get(controller.getMovieById)
  .patch(auth, controller.patchMovieById)
  .put(auth, controller.putMovieById)
  .delete(auth, controller.deleteMovieById);
