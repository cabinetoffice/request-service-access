jest.mock('../../../src/utils/logger');
jest.mock('../../../src/middleware/logger.middleware');
jest.mock('../../../src/middleware/authentication.middleware');
jest.mock('uuid');

import { jest, beforeEach, describe, expect, test } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import request from 'supertest';

import app from '../../../src/app';
import * as config from '../../../src/config';
import { logger } from '../../../src/middleware/logger.middleware';
import { log } from '../../../src/utils/logger';
import { authentication } from '../../../src/middleware/authentication.middleware';

import { MOCK_GITHUB_HOME_REDIRECT_MESSAGE, MOCK_POST_ADDITIONAL_REQUESTS_RESPONSE, MOCK_GET_ADDITIONAL_REQUESTS_RESPONSE } from '../../mock/text.mock';
import { MOCK_POST_ADDITIONAL_REQUESTS } from '../../mock/data';
import { ErrorMessages } from '../../../src/validation/error.messages';
import { mockID, mockUuidv4 } from '../../mock/session.mock';

const mockedLogger = logger as jest.Mock<typeof logger>;
mockedLogger.mockImplementation((_req: Request, _res: Response, next: NextFunction) => next());
const mockedAuth = authentication as jest.Mock<typeof authentication>;
mockedAuth.mockImplementation((_req: Request, _res: Response, next: NextFunction) => next());

describe('additional-requests endpoint integration tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET tests', () => {
        test('renders the additional-requests page', async () => {
            const res = await request(app).get(config.ADDITIONAL_REQUESTS_URL);

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_GET_ADDITIONAL_REQUESTS_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });
    describe('POST tests', () => {
        test('Should redirect to github-home page after POST request', async () => {
            const res = await request(app).post(config.ADDITIONAL_REQUESTS_URL).send(MOCK_POST_ADDITIONAL_REQUESTS);

            expect(res.status).toEqual(302);
            expect(res.text).toContain(MOCK_GITHUB_HOME_REDIRECT_MESSAGE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should render the same page with error messages after POST request', async () => {
            const res = await request(app).post(config.ADDITIONAL_REQUESTS_URL).send({
                context: '',
                description: ''
            });

            expect(res.status).toEqual(200);
            expect(res.text).toContain(ErrorMessages.CONTEXT);
            expect(res.text).toContain(ErrorMessages.DESCRIPTION_REQUIRED);
            expect(res.text).toContain(MOCK_GET_ADDITIONAL_REQUESTS_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should log the Context on POST request.', async () => {
            mockUuidv4.mockImplementation(_ => mockID);
            const res = await request(app).post(config.ADDITIONAL_REQUESTS_URL).send(MOCK_POST_ADDITIONAL_REQUESTS);

            const mockLog = log.info as jest.Mock;

            expect(res.text).toContain(MOCK_GITHUB_HOME_REDIRECT_MESSAGE);
            expect(mockLog).toBeCalledWith(`${MOCK_POST_ADDITIONAL_REQUESTS_RESPONSE}${mockID}`);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });
});
