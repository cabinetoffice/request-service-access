jest.mock('../../../../src/middleware/logger.middleware');
jest.mock('../../../../src/middleware/authentication.middleware');
jest.mock('../../../../src/utils/logger');

import { jest, beforeEach, describe, expect, test } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import request from 'supertest';

import app from '../../../../src/app';
import * as config from '../../../../src/config';
import { log } from '../../../../src/utils/logger';
import { logger } from '../../../../src/middleware/logger.middleware';
import { authentication } from '../../../../src/middleware/authentication.middleware';

import {
    MOCK_GITHUB_HOME_REDIRECT_MESSAGE,
    MOCK_GET_COLLABORATOR_RESPONSE,
    MOCK_POST_COLLABORATOR_RESPONSE
} from '../../../mock/text.mock';
import { MOCK_POST_COLLABORATOR } from '../../../mock/data';
import { ErrorMessages } from '../../../../src/validation/error.messages';

const mockedLogger = logger as jest.Mock<typeof logger>;
mockedLogger.mockImplementation((_req: Request, _res: Response, next: NextFunction) => next());
const mockedAuth = authentication as jest.Mock<typeof authentication>;
mockedAuth.mockImplementation((_req: Request, _res: Response, next: NextFunction) => next());

describe('Collaborator endpoint integration tests', () => {

    const collaboratorEndpoint = config.GITHUB_URL + config.CREATE + config.COLLABORATOR_URL;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET tests', () => {
        test('renders the collaborator page', async () => {
            const res = await request(app).get(collaboratorEndpoint);

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_GET_COLLABORATOR_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });
    describe('collaborator POST tests', () => {
        test('Should redirect to github-home page after POST request', async () => {
            const res = await request(app).post(collaboratorEndpoint).send(MOCK_POST_COLLABORATOR);

            expect(res.status).toEqual(302);
            expect(res.text).toContain(MOCK_GITHUB_HOME_REDIRECT_MESSAGE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should render the same page with error messages after POST request', async () => {
            const res = await request(app).post(collaboratorEndpoint).send({
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
            expect(res.text).toContain(MOCK_GET_COLLABORATOR_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should log the collaborator details on POST request.', async () => {
            const res = await request(app).post(collaboratorEndpoint).send(MOCK_POST_COLLABORATOR);

            const mockLog = log.info as jest.Mock;

            expect(mockLog).toBeCalledWith(MOCK_POST_COLLABORATOR_RESPONSE);
            expect(res.text).toContain(MOCK_GITHUB_HOME_REDIRECT_MESSAGE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });
});
