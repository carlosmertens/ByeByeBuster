import * as express from 'express-serve-static-core';

declare global {
  namespace Express {
    // Inject additional properties to express.Request
    interface Request {
      /**
       * property customField is a test property
       */
      customField?: string;
      customUser: {
        _id: string;
      };
    }
  }
}
