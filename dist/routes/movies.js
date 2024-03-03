"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesRouter = void 0;
const express_1 = require("express");
const movies_1 = require("../controllers/movies");
exports.moviesRouter = (0, express_1.Router)();
exports.moviesRouter
    .route('/')
    .get(movies_1.controller.getAllMovies)
    .post(movies_1.controller.postNewMovie);
exports.moviesRouter
    .route('/:id')
    .get(movies_1.controller.getMovieById)
    .patch(movies_1.controller.patchMovieById)
    .put(movies_1.controller.putMovieById)
    .delete(movies_1.controller.deleteMovieById);
