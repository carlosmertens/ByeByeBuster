import mongoose from 'mongoose';
import Joi from 'joi';
import { ICustomer } from 'dtos';

const customerSchema = new mongoose.Schema<ICustomer>({
  firstName: { type: String, required: true, minlength: 1, maxlength: 30 },
  lastName: { type: String, required: true, minlength: 1, maxlength: 30 },
  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: Date.now },
});

const CustomerModel = mongoose.model<ICustomer>('customer', customerSchema);

function validateCustomer(customer: ICustomer) {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(30).required(),
    lastName: Joi.string().min(1).max(30).required(),
  });
  return schema.validate(customer);
}

export { CustomerModel, validateCustomer };
