"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGenre = exports.GenreModel = exports.genreSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
// Create Schema for a new Collection
exports.genreSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 25,
    },
});
// Compile and export schema into a model
exports.GenreModel = mongoose_1.default.model('genres', exports.genreSchema);
// Function to validate Genre schema
function validateGenre(genre) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).max(25).required(),
    });
    return schema.validate(genre);
}
exports.validateGenre = validateGenre;
