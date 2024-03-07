"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMovie = exports.MovieModel = void 0;
const joi_1 = __importDefault(require("joi"));
const Genre_1 = require("./Genre");
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50,
    },
    genre: { type: Genre_1.genreSchema, required: true },
    numberInStock: { type: Number, min: 0, max: 50, default: 10 },
    dailyRentalRate: { type: Number, min: 0, max: 50, default: 20 },
});
const MovieModel = mongoose_1.default.model('movies', movieSchema);
exports.MovieModel = MovieModel;
function validateMovie(movie) {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(1).max(50).required(),
        // genre: Joi.isSchema(genreSchema),
        genreId: joi_1.default.string().required(),
    });
    return schema.validate(movie);
}
exports.validateMovie = validateMovie;
