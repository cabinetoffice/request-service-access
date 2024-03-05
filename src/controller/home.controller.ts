import { NextFunction, Request, Response } from 'express';
import { getSessionData } from '@co-digital/login';

import * as config from '../config';
import { log } from '../utils/logger';
import { ApplicationData } from '../model/application.model';

export const get = (req: Request, res: Response, next: NextFunction) => {
    try {
        const appData: ApplicationData = getSessionData(req.session);

        return res.render(config.HOME, {
            ...appData
        });
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
