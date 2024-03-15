"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logs_1 = require("../logs");
/**
 * Function to start database connection.
 * Use mongoose to connect to MongoDB Atlas cloud
 */
function startDB() {
    mongoose_1.default
        .connect(process.env.ATLAS_URI)
        .then(() => logs_1.log.db('MongoDB connected'))
        .catch(error => logs_1.log.error(error));
}
exports.startDB = startDB;
