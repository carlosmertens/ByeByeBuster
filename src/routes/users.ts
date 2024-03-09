import { Router } from 'express';
import { controller } from '../controllers/users';

export const usersRouter = Router();

usersRouter.get('/', controller.getAllUsers);

usersRouter.post('/', controller.postNewUser);
