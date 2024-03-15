import { ErrorRequestHandler } from 'express';
import { log } from '../logs';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  log.error(err);
  res.status(500).send({ message: 'ErrorHandler: Something failed.' });
};
