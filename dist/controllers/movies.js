"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const Movie_1 = require("../models/Movie");
const Genre_1 = require("../models/Genre");
const logs_1 = require("../logs");
async function getAllMovies(req, res) {
    try {
        const allMovies = await Movie_1.MovieModel.find().sort('title');
        res.send(allMovies);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}
async function postNewMovie(req, res) {
    const { error } = (0, Movie_1.validateMovie)(req.body);
    if (error)
        return res.status(400).send(error.message);
    const genre = await Genre_1.GenreModel.findById(req.body.genreId);
    if (!genre)
        return res.status(400).send(error);
    try {
        let movie = new Movie_1.MovieModel({
            title: req.body.title,
            genre: { _id: genre._id, name: genre.name },
        });
        movie = await movie.save();
        res.status(201).send(movie);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}
async function getMovieById(req, res) {
    try {
        const movie = await Movie_1.MovieModel.findById(req.params.id);
        res.send(movie);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Movie Not Found' });
    }
}
async function patchMovieById(req, res) {
    try {
        // 1. Retrieve requested id on db
        // 2 Modify any value changes
        // 3. Save modified genre
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Movie Not Found' });
    }
}
async function putMovieById(req, res) {
    const { error } = (0, Movie_1.validateMovie)(req.body);
    if (error)
        return res.status(400).send(error.message);
    try {
        const movie = await Movie_1.MovieModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        res.send(movie);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Movie Not Found' });
    }
}
async function deleteMovieById(req, res) {
    try {
        const movie = await Movie_1.MovieModel.findByIdAndDelete(req.params.id);
        res.send(movie);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Movie Not Found' });
    }
}
exports.controller = {
    getAllMovies,
    postNewMovie,
    getMovieById,
    patchMovieById,
    putMovieById,
    deleteMovieById,
};
