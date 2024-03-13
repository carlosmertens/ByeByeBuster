import { Router } from 'express';
import { controller } from '../controllers/users';
import { auth } from '../middlewares/auth';

export const usersRouter = Router();

usersRouter.get('/', auth, controller.getAllUsers);

usersRouter.get('/me', auth, controller.meUser);

usersRouter.post('/', controller.postNewUser);
