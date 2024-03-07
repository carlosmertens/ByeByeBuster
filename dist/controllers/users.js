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
const User_1 = require("../models/User");
const logs_1 = require("../logs");
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = User_1.UserModel.find({ name: 1 });
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
        user = new User_1.UserModel(Object.assign({}, req.body));
        yield user.save();
        res.send(user);
    });
}
exports.controller = { getAllUsers, postNewUser };
