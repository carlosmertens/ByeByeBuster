import { Router } from 'express';
import { controller } from '../controllers/genres';

export const genresRouter = Router();

genresRouter
  .route('/')
  .get(controller.getAllGenres)
  .post(controller.createNewGenre);

genresRouter
  .route('/:id')
  .get(controller.getGenreById)
  .put(controller.updateGenreById)
  .delete(controller.deleteGenreById);
