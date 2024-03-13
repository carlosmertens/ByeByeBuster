import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { log } from '../logs';
// import { RequestAuth } from '../interfaces';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  // Check for toke on request
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied.');

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.user = decodedUser;
    next();
  } catch (err) {
    log.error(err);
    res.status(400).send('Invalid JWT credentials.');
  }

  // jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
  //   if (err) return res.status(403).send('Forbidden.');

  //   req.user = user;
  //   next();
  // });
};
