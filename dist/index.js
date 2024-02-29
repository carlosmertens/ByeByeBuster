"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const genres_1 = require("./routes/genres");
const customers_1 = require("./routes/customers");
const logs_1 = require("./logs");
const logger_1 = require("./middlewares/logger");
// Initialize App
const app = (0, express_1.default)();
const port = process.env.PORT || 8081;
// Initialize Database connection
mongoose_1.default
    .connect(process.env.ATLAS_URI)
    .then(() => logs_1.log.db('MongoDB connected'))
    .catch(error => console.error(error));
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(logger_1.logger);
// Routes
app.use('/api/genres', genres_1.genresRouter);
app.use('/api/customers', customers_1.customersRouter);
// Port Listener
app.listen(port, () => logs_1.log.server(`Ready and listening on port ${port}`));
