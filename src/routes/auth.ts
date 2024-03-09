import Joi from 'joi';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import { IUserAuth } from '../interfaces';
import { UserModel } from '../models/User';

export const authRouter = Router();

authRouter.post('/', async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  res.send({ status: true, message: 'User authorized' });
});

function validateAuth(req: IUserAuth) {
  const schema = Joi.object({
    email: Joi.string().required().email().min(6).max(50),
    password: Joi.string().required().min(4).max(25),
  });

  return schema.validate(req);
}
