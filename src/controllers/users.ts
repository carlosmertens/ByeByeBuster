import { Request, Response } from 'express';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import { UserModel, validateUser } from '../models/User';
import { log } from '../logs';

async function getAllUsers(req: Request, res: Response) {
  try {
    const allUsers = await UserModel.find();
    res.send(allUsers);
  } catch (err) {
    log.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

async function postNewUser(req: Request, res: Response) {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await UserModel.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ message: 'User already exists.' });

  user = new UserModel(_.pick(req.body, ['name', 'email', 'password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'name', 'email']));
}

// token Maria
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVlMjBhYzg1MjZiZDQ2YTJhY2RjMjMiLCJpYXQiOjE3MTAxMDQ3NDksImV4cCI6MTcxMDE5MTE0OX0.3OGBU62NNgQgUuMG23pKjSRQsqHqPYGnYHQolMKroVs

// Token Pedro
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVlMjY4ZjlhYTlhN2JkMTdlMTQzNjUiLCJpYXQiOjE3MTAxMDYyNTUsImV4cCI6MTcxMDE5MjY1NX0.7-6rvRf-3oFyVvcYCFKX8n4xLOJVgcpC1uDy0P3shgw

export const controller = { getAllUsers, postNewUser };
