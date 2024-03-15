import { Express } from 'express';
import { genresRouter } from '../routes/genres';
import { customersRouter } from '../routes/customers';
import { moviesRouter } from '../routes/movies';
import { rentalsRouter } from '../routes/rentals';
import { usersRouter } from '../routes/users';
import { authRouter } from '../routes/auth';
import { errorHandler } from '../middlewares/errorHandler';

export function startRoutes(app: Express) {
  app.use('/api/genres', genresRouter);
  app.use('/api/customers', customersRouter);
  app.use('/api/movies', moviesRouter);
  app.use('/api/rentals', rentalsRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/auth', authRouter);

  // NOTE: winston npm package will be a better option for a more professional error logger and tracker

  // Global error handler
  app.use(errorHandler);
}
