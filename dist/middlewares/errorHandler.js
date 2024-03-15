"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logs_1 = require("../logs");
const errorHandler = (err, req, res, next) => {
    logs_1.log.error(err.message);
    res.status(500).send({ message: 'ErrorHandler: Something failed.' });
};
exports.errorHandler = errorHandler;
