"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
// import { RequestUserAuth } from '../interfaces';
const Genre_1 = require("../models/Genre");
const logs_1 = require("../logs");
/**
 * Function controller. Will response all genres in the database sorted by descending name.
 * @param req
 * @param res
 */
const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre_1.GenreModel.find().sort('name');
        res.send(genres);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
const postNewGenre = async (req, res) => {
    const { error } = (0, Genre_1.validateGenre)(req.body);
    if (error) {
        logs_1.log.error(error);
        return res.status(400).send(error.message);
    }
    try {
        let genre = new Genre_1.GenreModel({ name: req.body.name });
        genre = await genre.save();
        res.status(201).send(genre);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
const getGenreById = async (req, res) => {
    try {
        const genre = await Genre_1.GenreModel.findById(req.params.id);
        res.send(genre);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Genre Not Found' });
    }
};
const patchGenreById = (req, res) => {
    try {
        // TODO:
        // 1. Retrieve requested id on db
        // 2 Modify any value changes
        // 3. Save modified genre
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Genre Not Found' });
    }
};
const putGenreById = async (req, res) => {
    const { error } = (0, Genre_1.validateGenre)(req.body);
    if (error)
        return res.status(400).send(error.message);
    try {
        const genre = await Genre_1.GenreModel.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
        }, { new: true });
        res.send(genre);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Genre Not Found' });
    }
};
const deleteGenreById = async (req, res) => {
    try {
        const genre = await Genre_1.GenreModel.findByIdAndDelete(req.params.id);
        res.send(genre);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Genre Not Found' });
    }
};
exports.controller = {
    getAllGenres,
    postNewGenre,
    getGenreById,
    patchGenreById,
    putGenreById,
    deleteGenreById,
};
