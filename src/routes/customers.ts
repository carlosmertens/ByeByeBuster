import { Router } from 'express';
import { controller } from '../controllers/customers';
import { auth } from '../middlewares/auth';

export const customersRouter = Router();

customersRouter
  .route('/')
  .get(controller.getAllCustomers)
  .post(auth, controller.postNewCustomer);

customersRouter
  .route('/:id')
  .get(controller.getCustomerById)
  .patch(auth, controller.patchCustomerById)
  .put(auth, controller.putCustomerById)
  .delete(auth, controller.deleteCustomerById);
