import { getUserEmailFromColaJwt } from '@co-digital/login';
import { Request } from 'express';

import * as config from '../config';

export const getUserEmail = (req: Request): string => {
    const jwt = req.signedCookies[config.COOKIE_ID_NAME];
    const userEmail = getUserEmailFromColaJwt(jwt);

    if (!userEmail) {
        throw new Error('Failed to decode JWT or no email found in token.');
    }
    return userEmail;
};
