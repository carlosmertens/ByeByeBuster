import { Router } from 'express';
import { controller } from '../controllers/genres';
import { auth } from '../middlewares/auth';
import { adminAuth } from '../middlewares/admin';

export const genresRouter = Router();

genresRouter
  .route('/')
  .get(controller.getAllGenres)
  .post(auth, controller.postNewGenre);

genresRouter
  .route('/:id')
  .get(controller.getGenreById)
  .patch(auth, controller.patchGenreById)
  .put(auth, controller.putGenreById)
  .delete(auth, adminAuth, controller.deleteGenreById);
