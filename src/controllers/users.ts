import { Request, Response } from 'express';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import { UserModel, validateUser } from '../models/User';
import { log } from '../logs';

// Function controller to handle GET request to get all users
async function getAllUsers(req: Request, res: Response) {
  try {
    const allUsers = await UserModel.find();
    res.send(allUsers);
  } catch (err) {
    log.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

async function meUser(req: Request, res: Response) {
  const me = await UserModel.findById(req.user._id).select('-password -__v');

  res.send(me);
}

// Function controller to handle POST Request to create new user
async function postNewUser(req: Request, res: Response) {
  // Validate data
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.message);

  // Check for existing user in DB
  let user = await UserModel.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ message: 'User already exists.' });

  // Create new user with user model
  user = new UserModel(_.pick(req.body, ['name', 'email', 'password']));

  // Create encrypted password with salt and hash
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // Save data in DB
  await user.save();

  // Generate auth token from user method
  const token = user.generateAuthToken();

  // Response with header (token) and selected properties
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'name', 'email']));
}

export const controller = { getAllUsers, postNewUser, meUser };
