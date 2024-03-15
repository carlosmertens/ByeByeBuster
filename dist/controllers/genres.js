"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const Genre_1 = require("../models/Genre");
const logs_1 = require("../logs");
const getAllGenres = async (req, res, next) => {
    const genres = await Genre_1.GenreModel.find().sort('name');
    res.send(genres);
};
const postNewGenre = async (req, res, next) => {
    const { error } = (0, Genre_1.validateGenre)(req.body);
    if (error) {
        logs_1.log.error(error);
        return res.status(400).send(error.message);
    }
    let genre = new Genre_1.GenreModel({ name: req.body.name });
    genre = await genre.save();
    res.status(201).send(genre);
};
const getGenreById = async (req, res) => {
    const genre = await Genre_1.GenreModel.findById(req.params.id);
    res.send(genre);
};
const patchGenreById = (req, res) => {
    // TODO:
    // 1. Retrieve requested id on db
    // 2 Modify any value changes
    // 3. Save modified genre
};
const putGenreById = async (req, res) => {
    const { error } = (0, Genre_1.validateGenre)(req.body);
    if (error)
        return res.status(400).send(error.message);
    const genre = await Genre_1.GenreModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    }, { new: true });
    res.send(genre);
};
const deleteGenreById = async (req, res) => {
    const genre = await Genre_1.GenreModel.findByIdAndDelete(req.params.id);
    res.send(genre);
};
exports.controller = {
    getAllGenres,
    postNewGenre,
    getGenreById,
    patchGenreById,
    putGenreById,
    deleteGenreById,
};
