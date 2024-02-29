"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const debug_1 = __importDefault(require("debug"));
// app spacename
// to enable, use terminal
// $export DEBUG=app:*
// or $export DEBUG=app:server,app:http
const server = (0, debug_1.default)('app:server');
const db = (0, debug_1.default)('app:db');
const http = (0, debug_1.default)('app:http');
const error = (0, debug_1.default)('app:error');
exports.log = { server, db, http, error };
