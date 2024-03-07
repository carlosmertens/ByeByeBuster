import { Router } from 'express';
import { controller } from '../controllers/users';

export const usersRouter = Router();

usersRouter.route('/').get(controller.getAllUsers).post(controller.postNewUser);
