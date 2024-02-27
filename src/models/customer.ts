import mongoose from 'mongoose';
import Joi from 'joi';
import { ICustomer } from '../interfaces';

const CustomerModel = mongoose.model<ICustomer>(
  'customer',
  new mongoose.Schema<ICustomer>({
    name: { type: String, minlength: 1, maxlength: 35, required: true },
    phone: { type: String, minlength: 6, maxlength: 20, required: true },
    isGold: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now },
  })
);

function validateCustomer(customer: ICustomer) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(35).required(),
    phone: Joi.string().min(6).max(20).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

export { CustomerModel, validateCustomer };
