jest.mock('@co-digital/login');

import { describe, test, expect, jest } from '@jest/globals';
import { Request } from 'express';
import { getUserEmailFromColaJwt } from '@co-digital/login';
import * as config from '../../../src/config';
import { getUserEmail } from '../../../src/utils/getUserEmail';

import { MOCK_EMAIL } from '../../mock/text.mock';

const mockGetUserEmailFromColaJwt = getUserEmailFromColaJwt as jest.Mock;

describe('getUserEmail unit tests', () => {
    test('should return user email if JWT is valid', () => {
        const mockJwt = 'mocked-jwt-token';

        mockGetUserEmailFromColaJwt.mockReturnValue(MOCK_EMAIL);

        const req = {
            signedCookies: {
                [config.COOKIE_ID_NAME]: mockJwt
            }
        } as Request;

        const email = getUserEmail(req);

        expect(email).toBe(MOCK_EMAIL);
        expect(mockGetUserEmailFromColaJwt).toHaveBeenCalledWith(mockJwt);
    });

    test('should throw error if JWT is invalid', () => {
        const mockJwt = 'invalid-jwt-token';
        mockGetUserEmailFromColaJwt.mockReturnValue(null);

        const req = {
            signedCookies: {
                [config.COOKIE_ID_NAME]: mockJwt
            }
        } as Request;

        expect(() => getUserEmail(req)).toThrow('Failed to decode JWT or no email found in token.');
        expect(mockGetUserEmailFromColaJwt).toHaveBeenCalledWith(mockJwt);
    });

    test('should throw error if no JWT is provided', () => {
        const req = {
            signedCookies: {
                [config.COOKIE_ID_NAME]: undefined
            }
        } as Request;

        expect(() => getUserEmail(req)).toThrow('Failed to decode JWT or no email found in token.');
        expect(mockGetUserEmailFromColaJwt).toHaveBeenCalledWith(undefined);
    });
});
