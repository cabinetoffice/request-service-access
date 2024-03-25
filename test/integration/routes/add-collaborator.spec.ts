jest.mock('../../../src/middleware/logger.middleware');
jest.mock('../../../src/middleware/authentication.middleware');
jest.mock('../../../src/utils/logger');

import { jest, beforeEach, describe, expect, test } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import request from 'supertest';

import app from '../../../src/app';
import * as config from '../../../src/config';
import { log } from '../../../src/utils/logger';
import { logger } from '../../../src/middleware/logger.middleware';
import { authentication } from '../../../src/middleware/authentication.middleware';

import {
    MOCK_HOME_REDIRECT_MESSAGE,
    MOCK_GET_ADD_COLLABORATOR_RESPONSE,
    MOCK_POST_ADD_COLLABORATOR_RESPONSE
} from '../../mock/text.mock';
import { MOCK_POST_ADD_COLLABORATOR } from '../../mock/data';
import { ErrorMessages } from '../../../src/validation/error.messages';

const mockedLogger = logger as jest.Mock<typeof logger>;
mockedLogger.mockImplementation((_req: Request, _res: Response, next: NextFunction) => next());
const mockedAuth = authentication as jest.Mock<typeof authentication>;
mockedAuth.mockImplementation((_req: Request, _res: Response, next: NextFunction) => next());

describe('Add-collaborator endpoint integration tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET tests', () => {
        test('renders the add-collaborator page', async () => {
            const res = await request(app).get(config.ADD_COLLABORATOR_URL);

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_GET_ADD_COLLABORATOR_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });
    describe('Add collaborator POST tests', () => {
        test('Should redirect to home page after POST request', async () => {
            const res = await request(app).post(config.ADD_COLLABORATOR_URL).send(MOCK_POST_ADD_COLLABORATOR);

            expect(res.status).toEqual(302);
            expect(res.text).toContain(MOCK_HOME_REDIRECT_MESSAGE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should render the same page with error messages after POST request', async () => {
            const res = await request(app).post(config.ADD_COLLABORATOR_URL).send({
                first_name: '',
                last_name: '',
                github_handle: '',
                email_address: '',
                repo_name: ''
            });

            expect(res.status).toEqual(200);
            expect(res.text).toContain(ErrorMessages.FIRST_NAME);
            expect(res.text).toContain(ErrorMessages.LAST_NAME);
            expect(res.text).toContain(ErrorMessages.GIT_HANDLE);
            expect(res.text).toContain(ErrorMessages.EMAIL_ADDRESS_EMPTY);
            expect(res.text).toContain(ErrorMessages.REPO_NAME);
            expect(res.text).toContain(MOCK_GET_ADD_COLLABORATOR_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should log the add-collaborator details on POST request.', async () => {
            const res = await request(app).post(config.ADD_COLLABORATOR_URL).send(MOCK_POST_ADD_COLLABORATOR);

            const mockLog = log.info as jest.Mock;

            expect(mockLog).toBeCalledWith(MOCK_POST_ADD_COLLABORATOR_RESPONSE);
            expect(res.text).toContain(MOCK_HOME_REDIRECT_MESSAGE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });
});
