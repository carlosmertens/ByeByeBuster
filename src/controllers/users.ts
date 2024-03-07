import { Request, Response } from 'express';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import { UserModel, validateUser } from '../models/User';
import { log } from '../logs';

async function getAllUsers(req: Request, res: Response) {
  try {
    const allUsers = UserModel.find({ name: 1 });
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

  res.send(_.pick(user, ['_id', 'name', 'email']));
}

export const controller = { getAllUsers, postNewUser };
