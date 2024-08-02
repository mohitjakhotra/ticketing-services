import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('here')
  if (req.isAuthenticated()) {
    console.log('isAuthenticated')
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};
