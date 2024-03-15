"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRoutes = void 0;
const genres_1 = require("../routes/genres");
const customers_1 = require("../routes/customers");
const movies_1 = require("../routes/movies");
const rentals_1 = require("../routes/rentals");
const users_1 = require("../routes/users");
const auth_1 = require("../routes/auth");
const errorHandler_1 = require("../middlewares/errorHandler");
function startRoutes(app) {
    app.use('/api/genres', genres_1.genresRouter);
    app.use('/api/customers', customers_1.customersRouter);
    app.use('/api/movies', movies_1.moviesRouter);
    app.use('/api/rentals', rentals_1.rentalsRouter);
    app.use('/api/users', users_1.usersRouter);
    app.use('/api/auth', auth_1.authRouter);
    // NOTE: winston npm package will be a better option for a more professional error logger and tracker
    // Global error handler
    app.use(errorHandler_1.errorHandler);
}
exports.startRoutes = startRoutes;
