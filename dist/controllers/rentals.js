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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const logs_1 = require("../logs");
const Rental_1 = require("../models/Rental");
const Customer_1 = require("../models/Customer");
const Movie_1 = require("../models/Movie");
const mongoose_1 = __importDefault(require("mongoose"));
function getAllRentals(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rentals = yield Rental_1.RentalModel.find().sort('-dateOut');
            res.send(rentals);
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });
}
function postNewRental(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = (0, Rental_1.validateRental)(req.body);
            if (error)
                return res.status(400).send(error.message);
            // TODO: Refactor objectId validation
            if (!mongoose_1.default.Types.ObjectId.isValid(req.body.customerId))
                return res.status(400).send('Invalid customer.');
            const customer = yield Customer_1.CustomerModel.findById(req.body.customerId);
            if (!customer)
                return res.status(400).send('Invalid customer.');
            // TODO: Refactor objectId validation
            if (!mongoose_1.default.Types.ObjectId.isValid(req.body.movieId))
                return res.status(400).send('Invalid movie.');
            const movie = yield Movie_1.MovieModel.findById(req.body.movieId);
            if (!movie)
                return res.status(400).send('Invalid movie.');
            if (movie.numberInStock === 0)
                return res.status(400).send('Movie not in stock.');
            let rental = new Rental_1.RentalModel({
                customer: {
                    _id: customer._id,
                    name: customer.name,
                    phone: customer.phone,
                },
                movie: {
                    _id: movie._id,
                    title: movie.title,
                    dailyRentalRate: movie.dailyRentalRate,
                },
            });
            // TODO
            // Create a transaction to save rental and movie as a unit
            rental = yield rental.save();
            movie.numberInStock--;
            movie.save();
            res.send(rental);
        }
        catch (err) {
            logs_1.log.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });
}
function getRentalById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rental = yield Rental_1.RentalModel.findById(req.params.id);
        if (!rental)
            return res.status(404).send('Id was not found.');
        res.send(rental);
    });
}
exports.controller = { getAllRentals, postNewRental, getRentalById };
