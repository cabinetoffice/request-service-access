import { NextFunction, Request, Response } from 'express';

import { log } from '../utils/logger';
import * as config from '../config';

import { getCookieValue } from '@co-digital/login';
import { getUserEmail } from '../utils/getUserEmail';

export const addUserEmail = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        if (config.NODE_ENV === 'production') {
            const jwt = getCookieValue(req.signedCookies, config.COOKIE_ID_NAME);
            const userEmail = getUserEmail(jwt);
            log.infoRequest(req, 'Adding email from JWT to res.locals.userEmail...');
            res.locals.userEmail = userEmail;
        } else {
            log.infoRequest(req, 'Adding placeholder email to res.locals.userEmail...');
            res.locals.userEmail = 'placeholder@fake.com';
        }

        next();

    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
