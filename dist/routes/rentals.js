"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalsRouter = void 0;
const rentals_1 = require("../controllers/rentals");
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
exports.rentalsRouter = (0, express_1.Router)();
exports.rentalsRouter
    .route('/')
    .get(rentals_1.controller.getAllRentals)
    .post(auth_1.auth, rentals_1.controller.postNewRental);
exports.rentalsRouter.get('/:id', rentals_1.controller.getRentalById);
