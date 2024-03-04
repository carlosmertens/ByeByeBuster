"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const Customer_1 = require("../models/Customer");
const logs_1 = require("../logs");
function getAllCustomers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allCustomers = yield Customer_1.CustomerModel.find().sort('name');
            res.send(allCustomers);
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });
}
function postNewCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = (0, Customer_1.validateCustomer)(req.body);
        if (error)
            return res.status(400).send(error.message);
        try {
            let customer = new Customer_1.CustomerModel(Object.assign({}, req.body));
            customer = yield customer.save();
            res.status(201).send(customer);
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });
}
function getCustomerById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customer = yield Customer_1.CustomerModel.findById(req.params.id);
            res.send(customer);
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(404).send({ message: 'Customer Not Found' });
        }
    });
}
function patchCustomerById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 1. Retrieve requested id on db
            // 2 Modify any value changes
            // 3. Save modified genre
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(404).send({ message: 'Customer Not Found' });
        }
    });
}
function putCustomerById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = (0, Customer_1.validateCustomer)(req.body);
        if (error)
            return res.status(400).send(error.message);
        try {
            const customer = yield Customer_1.CustomerModel.findByIdAndUpdate(req.params.id, Object.assign({}, req.body), { new: true });
            res.send(customer);
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(404).send({ message: 'Customer Not Found' });
        }
    });
}
function deleteCustomerById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customer = yield Customer_1.CustomerModel.findByIdAndDelete(req.params.id);
            res.send(customer);
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(404).send({ message: 'Customer Not Found' });
        }
    });
}
exports.controller = {
    getAllCustomers,
    postNewCustomer,
    getCustomerById,
    patchCustomerById,
    putCustomerById,
    deleteCustomerById,
};
