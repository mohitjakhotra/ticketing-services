import { Request, Response, NextFunction } from 'express';

export const verifyPermissions = (req: Request, res: Response, next: NextFunction) => {
  // Implement permission checking logic here
  console.log(req, res)
  console.log('here')
  next();
};
