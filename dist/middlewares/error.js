"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const logs_1 = require("../logs");
const error = (err, req, res, next) => {
    logs_1.log.error(err);
    res.status(500).send({ message: 'Something failed.' });
};
exports.error = error;
