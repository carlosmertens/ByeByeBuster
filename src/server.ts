import 'dotenv/config';
import express from 'express';
import {log} from './logs';
import {startRoutes} from './startup/routes';
import {startDB} from './startup/db';
import {startMiddlewares} from './startup/middlewares';
import {startProd} from './startup/production';

// throw new Error('new error');
process.on('uncaughtException', ex => {
  log.error(ex.message, ex);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  log.error(err);
  process.exit(1);
});

// Initialize App
const app = express();

// MongoDB Atlas cloud
startDB();

// Middlewares
startMiddlewares;

// Routes
startRoutes(app);

//
startProd(app);

// Port Listener
const port = process.env.PORT || 8081;
app.listen(port, () => log.server(`Ready and listening on port ${port}`));
