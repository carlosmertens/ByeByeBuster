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
function getAllMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send('GET MOVIES REQUEST');
    });
}
function postNewMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send('POST NEW MOVIE REQUEST');
    });
}
function getMovieById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send('GET MOVIE BY ID');
    });
}
function patchMovieById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send('PATCH MOVIE BY ID');
    });
}
function putMovieById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send('PUT MOVIE BY ID');
    });
}
function deleteMovieById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send('DELETE MOVIE BY ID');
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
