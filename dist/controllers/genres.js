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
const Genre_1 = require("../models/Genre");
const logs_1 = require("../logs");
const getAllGenres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genres = yield Genre_1.GenreModel.find().sort('name');
        res.send(genres);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
const createNewGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, Genre_1.validateGenre)(req.body);
    if (error) {
        logs_1.log.error(error);
        return res.status(400).send(error.message);
    }
    try {
        let genre = new Genre_1.GenreModel({ name: req.body.name });
        genre = yield genre.save();
        res.status(201).send(genre);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
const getGenreById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genre = yield Genre_1.GenreModel.findById(req.params.id);
        res.send(genre);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Genre Not Found' });
    }
});
const updateGenreById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, Genre_1.validateGenre)(req.body);
    if (error)
        return res.status(400).send(error.message);
    try {
        const genre = yield Genre_1.GenreModel.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
        }, { new: true });
        res.send(genre);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Genre Not Found' });
    }
});
const deleteGenreById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genre = yield Genre_1.GenreModel.findByIdAndDelete(req.params.id);
        res.send(genre);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(404).send({ message: 'Genre Not Found' });
    }
});
exports.controller = {
    getAllGenres,
    createNewGenre,
    getGenreById,
    updateGenreById,
    deleteGenreById,
};
