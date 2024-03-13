import mongoose from 'mongoose';
import Joi from 'joi';
import { TCustomer } from '../types';

const CustomerModel = mongoose.model<TCustomer>(
  'customers',
  new mongoose.Schema<TCustomer>({
    name: { type: String, required: true, minlength: 1, maxlength: 35 },
    phone: { type: String, required: true, minlength: 6, maxlength: 20 },
    isGold: { type: Boolean, default: false },
  })
);

function validateCustomer(customer: TCustomer) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(35).required(),
    phone: Joi.string().min(6).max(20).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

export { CustomerModel, validateCustomer };
