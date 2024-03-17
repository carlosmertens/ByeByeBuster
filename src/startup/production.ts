import {Express} from 'express';
import helmet from 'helmet';
import compression from 'compression';

export function startProd(app: Express) {
  app.use(helmet());
  app.use(compression());
}
