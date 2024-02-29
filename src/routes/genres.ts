import { Router } from 'express';
import { controller } from '../controllers/genres';

export const genresRouter = Router();

genresRouter
  .route('/')
  .get(controller.getAllGenres)
  .post(controller.postNewGenre);

genresRouter
  .route('/:id')
  .get(controller.getGenreById)
  .patch(controller.patchGenreById)
  .put(controller.putGenreById)
  .delete(controller.deleteGenreById);
