"use strict";
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
async function getAllRentals(req, res) {
    try {
        const rentals = await Rental_1.RentalModel.find().sort('-dateOut');
        res.send(rentals);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}
async function postNewRental(req, res) {
    try {
        const { error } = (0, Rental_1.validateRental)(req.body);
        if (error)
            return res.status(400).send(error.message);
        // TODO: Refactor objectId validation - joi-objectid
        if (!mongoose_1.default.Types.ObjectId.isValid(req.body.customerId))
            return res.status(400).send('Invalid customer.');
        const customer = await Customer_1.CustomerModel.findById(req.body.customerId);
        if (!customer)
            return res.status(400).send('Invalid customer.');
        // TODO: Refactor objectId validation
        if (!mongoose_1.default.Types.ObjectId.isValid(req.body.movieId))
            return res.status(400).send('Invalid movie.');
        const movie = await Movie_1.MovieModel.findById(req.body.movieId);
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
        // TODO:
        // Create a transaction to save rental and movie as a unit
        // Look into fawn or mongoose transactions
        rental = await rental.save();
        movie.numberInStock--;
        movie.save();
        res.send(rental);
    }
    catch (err) {
        logs_1.log.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}
async function getRentalById(req, res) {
    const rental = await Rental_1.RentalModel.findById(req.params.id);
    if (!rental)
        return res.status(404).send('Id was not found.');
    res.send(rental);
}
exports.controller = { getAllRentals, postNewRental, getRentalById };
