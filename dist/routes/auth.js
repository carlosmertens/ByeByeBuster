"use strict";
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
exports.authRouter.post('/', async (req, res) => {
    // Validate data
    const { error } = validateAuth(req.body);
    if (error)
        return res.status(400).send(error.message);
    // Find user in DB
    let user = await User_1.UserModel.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Invalid email or password.');
    // Compare password in request with encrypted one in DB
    const validPassword = await bcrypt_1.default.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Invalid email or password.');
    // Generate auth token
    const token = user.generateAuthToken();
    // Response with token generated
    res.send(token);
});
// Function to validate incoming request
function validateAuth(req) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().required().email().min(6).max(50),
        password: joi_1.default.string().required().min(4).max(25),
    });
    return schema.validate(req);
}
