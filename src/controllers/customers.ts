import { RequestHandler } from 'express';
import { CustomerModel, validateCustomer } from '../models/Customer';
import { log } from '../logs';

const getAllCustomers: RequestHandler = async (req, res) => {
  try {
    const allCustomers = await CustomerModel.find().sort('name');
    res.send(allCustomers);
  } catch (err) {
    log.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

const createNewCustomer: RequestHandler = async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.message);

  try {
    let customer = new CustomerModel({ ...req.body });
    customer = await customer.save();
    res.status(201).send(customer);
  } catch (err) {
    log.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

const getCustomerById: RequestHandler = async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    res.send(customer);
  } catch (err) {
    log.error(err);
    res.status(404).send({ message: 'Customer Not Found' });
  }
};

const updateCustomerById: RequestHandler = async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.message);

  try {
    const customer = await CustomerModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.send(customer);
  } catch (err) {
    log.error(err);
    res.status(404).send({ message: 'Customer Not Found' });
  }
};

const deleteCustomerById: RequestHandler = async (req, res) => {
  try {
    const customer = await CustomerModel.findByIdAndDelete(req.params.id);
    res.send(customer);
  } catch (err) {
    log.error(err);
    res.status(404).send({ message: 'Customer Not Found' });
  }
};

export const controller = {
  getAllCustomers,
  createNewCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
