import mongoose from 'mongoose';
import Joi from 'joi';
import { ICustomer } from '../interfaces';

const CustomerModel = mongoose.model<ICustomer>(
  'customers',
  new mongoose.Schema<ICustomer>({
    name: { type: String, required: true, minlength: 1, maxlength: 35 },
    phone: { type: String, required: true, minlength: 6, maxlength: 20 },
    isGold: { type: Boolean, default: false },
  })
);

function validateCustomer(customer: ICustomer) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(35).required(),
    phone: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(customer);
}

export { CustomerModel, validateCustomer };
