"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_1 = require("../controllers/users");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/', users_1.controller.getAllUsers);
exports.usersRouter.post('/', users_1.controller.postNewUser);
