import { Request, Response, NextFunction } from 'express';

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user.isAdmin) return res.status(403).send('Only admin can delete.');

  next();
}

// 401 Unauthorized
// 403 Forbidden
