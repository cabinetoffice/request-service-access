jest.mock('@co-digital/login');
jest.mock('../../../src/utils/logger', () => ({
    log: {
        info: jest.fn()
    }
}));
jest.mock('../../../src/config/index.ts', () => ({
    __esModule: true,
    NODE_ENV: null
}));

import { describe, test, expect, jest } from '@jest/globals';
import { Request } from 'express';
import { getUserEmailFromColaJwt } from '@co-digital/login';
import * as config from '../../../src/config';
import { log } from '../../../src/utils/logger';
import { getUserEmail } from '../../../src/utils/getUserEmail';

import { MOCK_EMAIL } from '../../mock/text.mock';

const mockGetUserEmailFromColaJwt = getUserEmailFromColaJwt as jest.Mock;
const configMock = config as { NODE_ENV: string };
const logInfoMock = log.info as jest.Mock;

describe('getUserEmail unit tests', () => {
    test('should return user email if JWT is valid', () => {
        configMock.NODE_ENV = 'production';
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
    test('should return null if NODE_ENV is not in production ', () => {
        configMock.NODE_ENV = 'development';
        const mockJwt = 'mocked-jwt-token';

        mockGetUserEmailFromColaJwt.mockReturnValue(MOCK_EMAIL);

        const req = {
            signedCookies: {
                [config.COOKIE_ID_NAME]: mockJwt
            }
        } as Request;

        const email = getUserEmail(req);

        expect(email).toBe(null);
        expect(logInfoMock).toBeCalledWith('Skipping getting user email...');
    });

    test('should throw error if JWT is invalid', () => {
        configMock.NODE_ENV = 'production';
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
        configMock.NODE_ENV = 'production';
        const req = {
            signedCookies: {
                [config.COOKIE_ID_NAME]: undefined
            }
        } as Request;

        expect(() => getUserEmail(req)).toThrow('Failed to decode JWT or no email found in token.');
        expect(mockGetUserEmailFromColaJwt).toHaveBeenCalledWith(undefined);
    });
});
