import express, { Express } from 'express';
import cors from 'cors';
import { logger } from '../middlewares/logger';

export function startMiddlewares(app: Express) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(logger);
}
