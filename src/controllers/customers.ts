import { RequestHandler } from 'express';
import { CustomerModel, validateCustomer } from '../models/Customer';

const getAllCustomers: RequestHandler = async (req, res) => {
  try {
    const customers = await CustomerModel.find().sort('name');
    res.send(customers);
  } catch (err) {
    console.log(err);
    res.status(500).send('Could not connect to Atlas database!');
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
    console.log(err.message);
    res.status(500).send('Could not connect to Atlas database!');
  }
};

const getCustomerById: RequestHandler = async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    res.send(customer);
  } catch (err) {
    console.log(err.message);
    res.status(404).send('Customer not found');
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
    console.log(err.message);
    res.status(404).send('Customer not found!');
  }
};

const deleteCustomerById: RequestHandler = async (req, res) => {
  try {
    const customer = await CustomerModel.findByIdAndDelete(req.params.id);
    res.send(customer);
  } catch (err) {
    console.log(err.message);
    res.status(404).send('Customer not found!');
  }
};

export const controller = {
  getAllCustomers,
  createNewCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
