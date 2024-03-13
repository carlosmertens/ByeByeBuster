"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const lodash_1 = __importDefault(require("lodash"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const logs_1 = require("../logs");
// Function controller to handle GET request to get all users
async function getAllUsers(req, res) {
    try {
        const allUsers = await User_1.UserModel.find();
        res.send(allUsers);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}
async function meUser(req, res) {
    const me = await User_1.UserModel.findById(req.user._id).select('-password -__v');
    res.send(me);
}
// Function controller to handle POST Request to create new user
async function postNewUser(req, res) {
    // Validate data
    const { error } = (0, User_1.validateUser)(req.body);
    if (error)
        return res.status(400).send(error.message);
    // Check for existing user in DB
    let user = await User_1.UserModel.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send({ message: 'User already exists.' });
    // Create new user with user model
    user = new User_1.UserModel(lodash_1.default.pick(req.body, ['name', 'email', 'password']));
    // Create encrypted password with salt and hash
    const salt = await bcrypt_1.default.genSalt(10);
    user.password = await bcrypt_1.default.hash(user.password, salt);
    // Save data in DB
    await user.save();
    // Generate auth token from user method
    const token = user.generateAuthToken();
    // Response with header (token) and selected properties
    res
        .header('x-auth-token', token)
        .send(lodash_1.default.pick(user, ['_id', 'name', 'email']));
}
exports.controller = { getAllUsers, postNewUser, meUser };
