import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { TUser } from '../types';

// Create schema to generate model
const userSchema = new mongoose.Schema<TUser>({
  name: { type: String, required: true, minlength: 1, maxlength: 30 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 255,
  },
  password: { type: String, required: true, minlength: 4, maxlength: 1024 },
  isAdmin: Boolean,
});

// Add method to generate Auth Token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: '1 day',
    }
  );

  return token;
};

// Create model for the user data colleaction
const UserModel = mongoose.model('users', userSchema);

// Function to validate data from an incoming request
function validateUser(user: TUser) {
  // TODO: Look into joi-password-complexity
  const schema = Joi.object({
    name: Joi.string().required().min(1).max(30),
    email: Joi.string().required().email().min(6).max(50),
    password: Joi.string().required().min(4).max(25),
  });

  return schema.validate(user);
}

export { UserModel, validateUser };
