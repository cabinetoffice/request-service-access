import { errorHandler } from '../controller/error.controller';
import { Request, Response, NextFunction } from 'express';

export const rateLimitHandler = (req: Request, res: Response, next: NextFunction) => {
    const err = new Error('Too Many Requests');
    res.statusCode = 429;
    errorHandler(err, req, res, next);
};
