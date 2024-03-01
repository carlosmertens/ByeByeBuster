import { Router } from 'express';
import { controller } from '../controllers/customers';

export const customersRouter = Router();

customersRouter
  .route('/')
  .get(controller.getAllCustomers)
  .post(controller.postNewCustomer);

customersRouter
  .route('/:id')
  .get(controller.getCustomerById)
  .patch(controller.patchCustomerById)
  .put(controller.putCustomerById)
  .delete(controller.deleteCustomerById);
