import { RequestHandler } from 'express';
import { log } from '../logs';

export const logger: RequestHandler = (req, res, next) => {
  log.http(req.method + ' ' + req.url);
  next();
};
