"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logs_1 = require("../logs");
// import { RequestAuth } from '../interfaces';
const auth = (req, res, next) => {
    // Check for toke on request
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(401).send('Access denied.');
    try {
        const decodedUser = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedUser;
        next();
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(400).send('Invalid JWT credentials.');
    }
    // jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
    //   if (err) return res.status(403).send('Forbidden.');
    //   req.user = user;
    //   next();
    // });
};
exports.auth = auth;
