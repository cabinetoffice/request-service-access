jest.mock('../../../src/middleware/logger.middleware');
jest.mock('../../../src/middleware/authentication.middleware');
jest.mock('../../../src/utils/logger');
jest.mock('uuid');
jest.mock('../../../src/utils/getUserEmail');
jest.mock('../../../src/service/notify');

import { jest, afterEach, describe, expect, test } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import request from 'supertest';

import app from '../../../src/app';
import * as config from '../../../src/config';
import { logger } from '../../../src/middleware/logger.middleware';
import { authentication } from '../../../src/middleware/authentication.middleware';

import {
    MOCK_CHECK_YOUR_REQUESTS_TITLE,
    MOCK_FOUND_REDIRECT_MESSAGE
} from '../../mock/text.mock';
import { MOCK_POST_ISSUE_URL } from '../../mock/data';
import { mockLogInfo } from '../../mock/log.mock';
import { mockID, mockUuidv4 } from '../../mock/session.mock';
import { getUserEmail } from '../../../src/utils/getUserEmail';
import { confirmationEmail } from '../../../src/service/notify';

const mockedLogger = logger as jest.Mock<typeof logger>;
mockedLogger.mockImplementation((_req: Request, _res: Response, next: NextFunction) => next());
const mockedAuth = authentication as jest.Mock<typeof authentication>;
mockedAuth.mockImplementation((_req: Request, _res: Response, next: NextFunction) => next());

const mockedGetUserEmail = getUserEmail as jest.Mock<typeof getUserEmail>;
const mockedConfirmationEmail = confirmationEmail as jest.Mock<typeof confirmationEmail>;
mockedConfirmationEmail.mockImplementation(() => Promise.resolve());

const redirectUrl = `${MOCK_FOUND_REDIRECT_MESSAGE}${config.CONFIRMATION_URL}/${mockID}`;

describe('check-your-requests endpoint integration tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET tests', () => {
        test('renders the check-your-requests page', async () => {
            const res = await request(app).get(config.CHECK_YOUR_REQUESTS_URL);

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_CHECK_YOUR_REQUESTS_TITLE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });

    describe('POST tests', () => {
        test('Should redirect to confirmation page after POST request', async () => {
            mockUuidv4.mockImplementation(_ => mockID);
            const res = await request(app).post(config.CHECK_YOUR_REQUESTS_URL);

            expect(res.status).toEqual(302);
            expect(res.text).toContain(redirectUrl);
            expect(mockedGetUserEmail).toHaveBeenCalledTimes(1);
            expect(mockedConfirmationEmail).toHaveBeenCalledTimes(1);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should log the submit url and Id on POST request.', async () => {
            mockUuidv4.mockImplementation(_ => mockID);

            const logMsg = `Submit Issue to ${MOCK_POST_ISSUE_URL}, ID: #${mockID}`;
            const res = await request(app).post(config.CHECK_YOUR_REQUESTS_URL);

            expect(mockLogInfo).toBeCalledWith(logMsg);
            expect(res.text).toContain(redirectUrl);
            expect(mockedGetUserEmail).toHaveBeenCalledTimes(1);
            expect(mockedConfirmationEmail).toHaveBeenCalledTimes(1);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });
});
