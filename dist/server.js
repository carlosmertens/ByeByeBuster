"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const logs_1 = require("./logs");
const routes_1 = require("./startup/routes");
const db_1 = require("./startup/db");
const middlewares_1 = require("./startup/middlewares");
// throw new Error('new error');
process.on('uncaughtException', ex => {
    logs_1.log.error(ex.message, ex);
    process.exit(1);
});
process.on('unhandledRejection', err => {
    logs_1.log.error(err);
    process.exit(1);
});
// Initialize App
const app = (0, express_1.default)();
// MongoDB Atlas cloud
(0, db_1.startDB)();
// Middlewares
middlewares_1.startMiddlewares;
// Routes
(0, routes_1.startRoutes)(app);
// Port Listener
const port = process.env.PORT || 8081;
app.listen(port, () => logs_1.log.server(`Ready and listening on port ${port}`));
