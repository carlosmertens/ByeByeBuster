import 'dotenv/config';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import { TUserAuth } from '../types';
import { UserModel } from '../models/User';

export const authRouter = Router();

authRouter.post('/', async (req, res) => {
  // Validate data
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.message);

  // Find user in DB
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  // Compare password in request with encrypted one in DB
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  // Generate auth token
  const token = user.generateAuthToken();

  // Response with token generated
  res.send(token);
});

// Function to validate incoming request
function validateAuth(req: TUserAuth) {
  const schema = Joi.object({
    email: Joi.string().required().email().min(6).max(50),
    password: Joi.string().required().min(4).max(25),
  });

  return schema.validate(req);
}
