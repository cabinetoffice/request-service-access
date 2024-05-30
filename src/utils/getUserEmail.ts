import { getUserEmailFromColaJwt } from '@co-digital/login';
import { log } from '../utils/logger';
import { Request } from 'express';

import * as config from '../config';

export const getUserEmail = (req: Request) => {
    if (config.NODE_ENV === 'production') {
        const jwt = req.signedCookies[config.COOKIE_ID_NAME];
        const userEmail = getUserEmailFromColaJwt(jwt);

        if (!userEmail) {
            throw new Error('Failed to decode JWT or no email found in token.');
        }
        return userEmail;
    }
    log.info('Skipping getting user email...');
    return null;
};
