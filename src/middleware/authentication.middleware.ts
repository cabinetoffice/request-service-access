import { NextFunction, Request, Response } from 'express';
import { log } from '../utils/logger';
import { isFeatureEnabled } from '../utils/isFeatureEnabled';
import * as config from '../config';

export const authentication = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
    // if auth is not enabled, render the not available page
        if (!isFeatureEnabled(config.FEATURE_FLAG_ENABLE_AUTH)) {
            log.infoRequest(req, 'sorry, auth service not available right now');
            return res.render(config.NOT_AVAILABLE);
        }

        // If auth enabled
        log.infoRequest(req, 'some auth here soon!');

        next();
    } catch (err: any) {
        log.errorRequest(req, err);
        next(err);
    }
};
