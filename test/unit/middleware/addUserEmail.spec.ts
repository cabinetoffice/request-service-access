jest.mock('../../../src/utils/logger', () => ({
    log: {
        infoRequest: jest.fn(),
        errorRequest: jest.fn()
    }
}));
jest.mock('../../../src/config/index.ts', () => ({
    __esModule: true,
    NODE_ENV: null,
    COOKIE_ID_NAME: null
}));
jest.mock('@co-digital/login');
jest.mock('../../../src/utils/getUserEmail.ts');

import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';

import { log } from '../../../src/utils/logger';
import * as config from '../../../src/config/index';

import { addUserEmail } from '../../../src/middleware/addUserEmail.middleware';
import { getCookieValue } from '@co-digital/login';
import { getUserEmail } from '../../../src/utils/getUserEmail';

import { mockRequest, mockResponse, mockNext } from '../../mock/express.mock';
import { MOCK_ERROR, MOCK_JWT, MOCK_JWT_NAME, MOCK_EMAIL } from '../../mock/data';

const configMock = config as { NODE_ENV: string, COOKIE_ID_NAME: string };
const logInfoRequestMock = log.infoRequest as jest.Mock;
const logErrorRequestMock = log.errorRequest as jest.Mock;
const getCookieValueMock = getCookieValue as jest.Mock;
const getUserEmailMock = getUserEmail as jest.Mock;

describe('addUserEmail middleware test suites', () => {

    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        next = mockNext;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should call getCookieValue, getUserEmail, assign the userEmail to res.locals.userEmail and next() if in production environment', () => {

        configMock.NODE_ENV = 'production';
        configMock.COOKIE_ID_NAME = MOCK_JWT_NAME;
        getCookieValueMock.mockReturnValueOnce(MOCK_JWT);
        getUserEmailMock.mockReturnValueOnce(MOCK_EMAIL);

        addUserEmail(req, res, next);

        expect(getCookieValueMock).toHaveBeenCalledTimes(1);
        expect(getCookieValueMock).toHaveBeenCalledWith(req.signedCookies, configMock.COOKIE_ID_NAME);

        expect(getUserEmailMock).toHaveBeenCalledTimes(1);
        expect(getUserEmailMock).toHaveBeenCalledWith(MOCK_JWT);

        expect(logInfoRequestMock).toHaveBeenCalledTimes(1);
        expect(logInfoRequestMock).toHaveBeenCalledWith(req, 'Adding email from JWT to res.locals.userEmail...');

        expect(res.locals.userEmail).toBe(MOCK_EMAIL);

        expect(next).toHaveBeenCalledTimes(1);

    });
    test('should assign a placeholder email to res.locals.userEmail if in non-production environment', () => {

        configMock.NODE_ENV = 'development';

        addUserEmail(req, res, next);

        expect(logInfoRequestMock).toHaveBeenCalledTimes(1);
        expect(logInfoRequestMock).toHaveBeenCalledWith(req, 'Adding placeholder email to res.locals.userEmail...');

        expect(res.locals.userEmail).toBe('placeholder@fake.com');

        expect(next).toHaveBeenCalledTimes(1);

    });
    test('should log an error and call next if an error is thrown', () => {

        configMock.NODE_ENV = 'production';
        getUserEmailMock.mockImplementationOnce(() => { throw new Error(MOCK_ERROR.message); });

        addUserEmail(req, res, next);

        expect(logErrorRequestMock).toHaveBeenCalledTimes(1);
        expect(logErrorRequestMock).toHaveBeenCalledWith(req, MOCK_ERROR.message);

        expect(next).toHaveBeenCalledTimes(1);

    });
});
