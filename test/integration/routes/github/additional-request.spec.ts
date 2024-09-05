jest.mock('../../../../src/utils/logger');
jest.mock('../../../../src/middleware/logger.middleware');
jest.mock('../../../../src/middleware/authentication.middleware');
jest.mock('uuid');

import { jest, beforeEach, describe, expect, test } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import request from 'supertest';

import app from '../../../../src/app';
import * as config from '../../../../src/config';
import { logger } from '../../../../src/middleware/logger.middleware';
import { log } from '../../../../src/utils/logger';
import { authentication } from '../../../../src/middleware/authentication.middleware';

import { MOCK_GITHUB_HOME_REDIRECT_MESSAGE, MOCK_POST_ADDITIONAL_REQUEST_RESPONSE, MOCK_GET_ADDITIONAL_REQUEST_RESPONSE } from '../../../mock/text.mock';
import { MOCK_POST_ADDITIONAL_REQUEST } from '../../../mock/data';
import { ErrorMessages } from '../../../../src/validation/error.messages';
import { mockID, mockUuidv4 } from '../../../mock/session.mock';

const mockedLogger = logger as jest.Mock<typeof logger>;
mockedLogger.mockImplementation((_req: Request, _res: Response, next: NextFunction) => next());
const mockedAuth = authentication as jest.Mock<typeof authentication>;
mockedAuth.mockImplementation((_req: Request, _res: Response, next: NextFunction) => next());

describe('additional-request endpoint integration tests', () => {

    const additionalReqeuestEndpoint = config.GITHUB_URL + config.CREATE + config.ADDITIONAL_REQUEST_URL;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET tests', () => {
        test('renders the additional-requests page', async () => {
            const res = await request(app).get(additionalReqeuestEndpoint);

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_GET_ADDITIONAL_REQUEST_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });
    describe('POST tests', () => {
        test('Should redirect to github-home page after POST request', async () => {
            const res = await request(app).post(additionalReqeuestEndpoint).send(MOCK_POST_ADDITIONAL_REQUEST);

            expect(res.status).toEqual(302);
            expect(res.text).toContain(MOCK_GITHUB_HOME_REDIRECT_MESSAGE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should render the same page with error messages after POST request', async () => {
            const res = await request(app).post(additionalReqeuestEndpoint).send({
                context: '',
                description: ''
            });

            expect(res.status).toEqual(200);
            expect(res.text).toContain(ErrorMessages.CONTEXT);
            expect(res.text).toContain(ErrorMessages.DESCRIPTION_REQUIRED);
            expect(res.text).toContain(MOCK_GET_ADDITIONAL_REQUEST_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should log the Context on POST request.', async () => {
            mockUuidv4.mockImplementation(_ => mockID);
            const res = await request(app).post(additionalReqeuestEndpoint).send(MOCK_POST_ADDITIONAL_REQUEST);

            const mockLog = log.info as jest.Mock;

            expect(res.text).toContain(MOCK_GITHUB_HOME_REDIRECT_MESSAGE);
            expect(mockLog).toBeCalledWith(`${MOCK_POST_ADDITIONAL_REQUEST_RESPONSE}${mockID}`);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });
});
