import { getUserEmailFromColaJwt } from '@co-digital/login';

export const getUserEmail = (jwt: string): string => {

    const userEmail = getUserEmailFromColaJwt(jwt);

    if (!userEmail) {
        throw new Error('Failed to decode JWT or no email found in token.');
    }
    return userEmail;
};
