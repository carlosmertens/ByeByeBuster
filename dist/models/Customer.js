"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCustomer = exports.CustomerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const CustomerModel = mongoose_1.default.model('customers', new mongoose_1.default.Schema({
    name: { type: String, required: true, minlength: 1, maxlength: 35 },
    phone: { type: String, required: true, minlength: 6, maxlength: 20 },
    isGold: { type: Boolean, default: false },
}));
exports.CustomerModel = CustomerModel;
function validateCustomer(customer) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(1).max(35).required(),
        phone: joi_1.default.string().min(6).max(20).required(),
        isGold: joi_1.default.boolean(),
    });
    return schema.validate(customer);
}
exports.validateCustomer = validateCustomer;
