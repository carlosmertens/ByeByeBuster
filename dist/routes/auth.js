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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
require("dotenv/config");
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = require("express");
const User_1 = require("../models/User");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateAuth(req.body);
    if (error)
        return res.status(400).send(error.message);
    let user = yield User_1.UserModel.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Invalid email or password.');
    const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Invalid email or password.');
    const token = user.generateAuthToken();
    res.send(token);
}));
function validateAuth(req) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().required().email().min(6).max(50),
        password: joi_1.default.string().required().min(4).max(25),
    });
    return schema.validate(req);
}
