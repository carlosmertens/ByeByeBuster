"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genresRouter = void 0;
const express_1 = require("express");
const genres_1 = require("../controllers/genres");
exports.genresRouter = (0, express_1.Router)();
exports.genresRouter
    .route('/')
    .get(genres_1.controller.getAllGenres)
    .post(genres_1.controller.postNewGenre);
exports.genresRouter
    .route('/:id')
    .get(genres_1.controller.getGenreById)
    .patch(genres_1.controller.patchGenreById)
    .put(genres_1.controller.putGenreById)
    .delete(genres_1.controller.deleteGenreById);
