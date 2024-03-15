import { Router } from 'express';
import { controller } from '../controllers/genres';
import { asyncHandler } from '../middlewares/asyncHandler';
import { auth } from '../middlewares/auth';
import { adminAuth } from '../middlewares/admin';

export const genresRouter = Router();

genresRouter
  .route('/')
  .get(asyncHandler(controller.getAllGenres))
  .post(auth, asyncHandler(controller.postNewGenre));

genresRouter
  .route('/:id')
  .get(asyncHandler(controller.getGenreById))
  .patch(auth, asyncHandler(controller.patchGenreById))
  .put(auth, asyncHandler(controller.putGenreById))
  .delete(auth, adminAuth, asyncHandler(controller.deleteGenreById));
