import { NextFunction, Request, Response } from 'express';
import * as config from '../config';

import { log } from '../utils/logger';

export const get = (_req: Request, res: Response) => {
    return res.render(config.ADDITIONAL_REQUESTS);
};

export const post = (req: Request, res: Response, next: NextFunction) => {
    try {

        const context = req.body.context;

        log.info(`Context: ${context}`);

        return res.redirect(config.HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
