import { Router } from 'express';
import { controller } from '../controllers/customers';

export const customersRouter = Router();

customersRouter
  .route('/')
  .get(controller.getAllCustomers)
  .post(controller.createNewCustomer);

customersRouter
  .route('/:id')
  .get(controller.getCustomerById)
  .put(controller.updateCustomerById)
  .delete(controller.deleteCustomerById);
