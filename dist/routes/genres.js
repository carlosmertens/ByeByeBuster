"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genresRouter = void 0;
const express_1 = require("express");
const genres_1 = require("../controllers/genres");
const auth_1 = require("../middlewares/auth");
exports.genresRouter = (0, express_1.Router)();
exports.genresRouter
    .route('/')
    .get(genres_1.controller.getAllGenres)
    .post(auth_1.auth, genres_1.controller.postNewGenre);
exports.genresRouter
    .route('/:id')
    .get(genres_1.controller.getGenreById)
    .patch(auth_1.auth, genres_1.controller.patchGenreById)
    .put(auth_1.auth, genres_1.controller.putGenreById)
    .delete(auth_1.auth, genres_1.controller.deleteGenreById);
