"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const Movie_1 = require("../models/Movie");
const Genre_1 = require("../models/Genre");
const logs_1 = require("../logs");
function getAllMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allMovies = yield Movie_1.MovieModel.find().sort('title');
            res.send(allMovies);
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });
}
function postNewMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = (0, Movie_1.validateMovie)(req.body);
        if (error)
            return res.status(400).send(error.message);
        const genre = yield Genre_1.GenreModel.findById(req.body.genreId);
        if (!genre)
            return res.status(400).send(error);
        try {
            let movie = new Movie_1.MovieModel({
                title: req.body.title,
                genre: { _id: genre._id, name: genre.name },
            });
            movie = yield movie.save();
            res.status(201).send(movie);
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });
}
function getMovieById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const movie = yield Movie_1.MovieModel.findById(req.params.id);
            res.send(movie);
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(404).send({ message: 'Movie Not Found' });
        }
    });
}
function patchMovieById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 1. Retrieve requested id on db
            // 2 Modify any value changes
            // 3. Save modified genre
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(404).send({ message: 'Movie Not Found' });
        }
    });
}
function putMovieById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = (0, Movie_1.validateMovie)(req.body);
        if (error)
            return res.status(400).send(error.message);
        try {
            const movie = yield Movie_1.MovieModel.findByIdAndUpdate(req.params.id, Object.assign({}, req.body), { new: true });
            res.send(movie);
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(404).send({ message: 'Movie Not Found' });
        }
    });
}
function deleteMovieById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const movie = yield Movie_1.MovieModel.findByIdAndDelete(req.params.id);
            res.send(movie);
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(404).send({ message: 'Movie Not Found' });
        }
    });
}
exports.controller = {
    getAllMovies,
    postNewMovie,
    getMovieById,
    patchMovieById,
    putMovieById,
    deleteMovieById,
};
