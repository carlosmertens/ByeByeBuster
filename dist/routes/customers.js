"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customersRouter = void 0;
const express_1 = require("express");
const customers_1 = require("../controllers/customers");
exports.customersRouter = (0, express_1.Router)();
exports.customersRouter
    .route('/')
    .get(customers_1.controller.getAllCustomers)
    .post(customers_1.controller.postNewCustomer);
exports.customersRouter
    .route('/:id')
    .get(customers_1.controller.getCustomerById)
    .patch(customers_1.controller.patchCustomerById)
    .put(customers_1.controller.putCustomerById)
    .delete(customers_1.controller.deleteCustomerById);
