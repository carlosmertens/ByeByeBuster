import { Request, Response, RequestHandler } from 'express';
import { CustomerModel, validateCustomer } from '../models/Customer';
import { log } from '../logs';

const getAllCustomers: RequestHandler = async (req, res, next) => {
  try {
    const allCustomers = await CustomerModel.find().sort('name');
    res.send(allCustomers);
  } catch (err) {
    next(err);
  }
};

async function postNewCustomer(req: Request, res: Response) {
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
}

async function getCustomerById(req: Request, res: Response) {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    res.send(customer);
  } catch (err) {
    log.error(err);
    res.status(404).send({ message: 'Customer Not Found' });
  }
}

async function patchCustomerById(req: Request, res: Response) {
  try {
    // 1. Retrieve requested id on db
    // 2 Modify any value changes
    // 3. Save modified genre
  } catch (err) {
    log.error(err);
    res.status(404).send({ message: 'Customer Not Found' });
  }
}

async function putCustomerById(req: Request, res: Response) {
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
}

async function deleteCustomerById(req: Request, res: Response) {
  try {
    const customer = await CustomerModel.findByIdAndDelete(req.params.id);
    res.send(customer);
  } catch (err) {
    log.error(err);
    res.status(404).send({ message: 'Customer Not Found' });
  }
}

export const controller = {
  getAllCustomers,
  postNewCustomer,
  getCustomerById,
  patchCustomerById,
  putCustomerById,
  deleteCustomerById,
};
