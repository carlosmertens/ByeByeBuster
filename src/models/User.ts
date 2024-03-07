import Joi from 'joi';
import { IUser } from '../interfaces';
import mongoose from 'mongoose';

const UserModel = mongoose.model(
  'users',
  new mongoose.Schema<IUser>({
    name: { type: String, required: true, minlength: 1, maxlength: 30 },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 255,
    },
    password: { type: String, required: true, minlength: 4, maxlength: 1024 },
  })
);

function validateUser(user: IUser) {
  // TODO: Look into joi-password-complexity
  const schema = Joi.object({
    name: Joi.string().required().min(1).max(30),
    email: Joi.string().required().email().min(6).max(50),
    password: Joi.string().required().min(4).max(25),
  });

  return schema.validate(user);
}

export { UserModel, validateUser };
