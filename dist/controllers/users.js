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
exports.controller = void 0;
const lodash_1 = __importDefault(require("lodash"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const logs_1 = require("../logs");
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield User_1.UserModel.find();
            res.send(allUsers);
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });
}
function postNewUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = (0, User_1.validateUser)(req.body);
        if (error)
            return res.status(400).send(error.message);
        let user = yield User_1.UserModel.findOne({ email: req.body.email });
        if (user)
            return res.status(400).send({ message: 'User already exists.' });
        user = new User_1.UserModel(lodash_1.default.pick(req.body, ['name', 'email', 'password']));
        const salt = yield bcrypt_1.default.genSalt(10);
        user.password = yield bcrypt_1.default.hash(user.password, salt);
        yield user.save();
        const token = user.generateAuthToken();
        res
            .header('x-auth-token', token)
            .send(lodash_1.default.pick(user, ['_id', 'name', 'email']));
    });
}
// token Maria
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVlMjBhYzg1MjZiZDQ2YTJhY2RjMjMiLCJpYXQiOjE3MTAxMDQ3NDksImV4cCI6MTcxMDE5MTE0OX0.3OGBU62NNgQgUuMG23pKjSRQsqHqPYGnYHQolMKroVs
// Token Pedro
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVlMjY4ZjlhYTlhN2JkMTdlMTQzNjUiLCJpYXQiOjE3MTAxMDYyNTUsImV4cCI6MTcxMDE5MjY1NX0.7-6rvRf-3oFyVvcYCFKX8n4xLOJVgcpC1uDy0P3shgw
exports.controller = { getAllUsers, postNewUser };
