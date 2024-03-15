"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const Customer_1 = require("../models/Customer");
const logs_1 = require("../logs");
const getAllCustomers = async (req, res, next) => {
    try {
        const allCustomers = await Customer_1.CustomerModel.find().sort('name');
        res.send(allCustomers);
    }
    catch (err) {
        next(err);
    }
};
async function postNewCustomer(req, res) {
    const { error } = (0, Customer_1.validateCustomer)(req.body);
    if (error)
        return res.status(400).send(error.message);
    try {
        let customer = new Customer_1.CustomerModel({ ...req.body });
        customer = await customer.save();
        res.status(201).send(customer);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}
async function getCustomerById(req, res) {
    try {
        const customer = await Customer_1.CustomerModel.findById(req.params.id);
        res.send(customer);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Customer Not Found' });
    }
}
async function patchCustomerById(req, res) {
    try {
        // 1. Retrieve requested id on db
        // 2 Modify any value changes
        // 3. Save modified genre
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Customer Not Found' });
    }
}
async function putCustomerById(req, res) {
    const { error } = (0, Customer_1.validateCustomer)(req.body);
    if (error)
        return res.status(400).send(error.message);
    try {
        const customer = await Customer_1.CustomerModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        res.send(customer);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Customer Not Found' });
    }
}
async function deleteCustomerById(req, res) {
    try {
        const customer = await Customer_1.CustomerModel.findByIdAndDelete(req.params.id);
        res.send(customer);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Customer Not Found' });
    }
}
exports.controller = {
    getAllCustomers,
    postNewCustomer,
    getCustomerById,
    patchCustomerById,
    putCustomerById,
    deleteCustomerById,
};
