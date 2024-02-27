import { Router } from 'express';
import { CustomerModel, validateCustomer } from '../models/customer';

export const customersRouter = Router();

customersRouter.get('/', async (req, res) => {
  try {
    const customers = await CustomerModel.find().sort('name');
    res.send(customers);
  } catch (err) {
    console.log(err);
    res.status(500).send('Could not connect to Atlas database!');
  }
});

customersRouter.post('/', async (req, res) => {
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
});

customersRouter.get('/:id', async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    res.send(customer);
  } catch (err) {
    console.log(err.message);
    res.status(404).send('Customer not found');
  }
});

customersRouter.put('/:id', async (req, res) => {
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
});

customersRouter.delete('/:id', async (req, res) => {
  try {
    const customer = await CustomerModel.findByIdAndDelete(req.params.id);
    res.send(customer);
  } catch (err) {
    console.log(err.message);
    res.status(404).send('Customer not found!');
  }
});
