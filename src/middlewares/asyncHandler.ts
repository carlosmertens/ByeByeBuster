import { RequestHandler, Request, Response, NextFunction } from 'express';

// NOTE: npm package express-async-errors will do the same

export function asyncHandler(handler: RequestHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
