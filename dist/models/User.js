"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.UserModel = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserModel = mongoose_1.default.model('users', new mongoose_1.default.Schema({
    name: { type: String, required: true, minlength: 1, maxlength: 30 },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 255,
    },
    password: { type: String, required: true, minlength: 8, maxlength: 1024 },
}));
exports.UserModel = UserModel;
function validateUser(user) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().min(1).max(30),
        email: joi_1.default.string().required().email().min(6).max(50),
        password: joi_1.default.string().required().min(8).max(50),
    });
    return schema.validate(user);
}
exports.validateUser = validateUser;
