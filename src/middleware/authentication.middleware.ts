import { NextFunction, Request, Response } from 'express';
import { log } from '../utils/logger';
import * as config from '../config';
import { colaAuthenticationMiddleware } from '@co-digital/login';

export const authentication = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        if (config.NODE_ENV === 'production') {
            log.infoRequest(req, 'Authenticating through COLA...');
            return colaAuthenticationMiddleware(req, res, next);
        }

        log.infoRequest(req, 'Skipping authentication...');
        next();

    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
