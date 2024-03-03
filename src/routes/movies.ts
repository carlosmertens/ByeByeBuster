import { Router } from 'express';
import { controller } from '../controllers/movies';

export const moviesRouter = Router();

moviesRouter
  .route('/')
  .get(controller.getAllMovies)
  .post(controller.postNewMovie);

moviesRouter
  .route('/:id')
  .get(controller.getMovieById)
  .patch(controller.patchMovieById)
  .put(controller.putMovieById)
  .delete(controller.deleteMovieById);
