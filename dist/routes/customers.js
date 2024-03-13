"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customersRouter = void 0;
const express_1 = require("express");
const customers_1 = require("../controllers/customers");
const auth_1 = require("../middlewares/auth");
exports.customersRouter = (0, express_1.Router)();
exports.customersRouter
    .route('/')
    .get(customers_1.controller.getAllCustomers)
    .post(auth_1.auth, customers_1.controller.postNewCustomer);
exports.customersRouter
    .route('/:id')
    .get(customers_1.controller.getCustomerById)
    .patch(auth_1.auth, customers_1.controller.patchCustomerById)
    .put(auth_1.auth, customers_1.controller.putCustomerById)
    .delete(auth_1.auth, customers_1.controller.deleteCustomerById);
