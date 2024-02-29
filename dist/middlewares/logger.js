"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logs_1 = require("../logs");
const logger = (req, res, next) => {
    logs_1.log.http(req.method + ' ' + req.url);
    next();
};
exports.logger = logger;
