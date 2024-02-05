jest.mock('../../../src/middleware/logger.middleware');
jest.mock('../../../src/middleware/authentication.middleware');

import { jest, beforeEach, describe, expect, test } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import request from 'supertest';

import app from '../../../src/app';
import * as config from '../../../src/config';
import { logger } from '../../../src/middleware/logger.middleware';
import { log } from '../../../src/utils/logger';
import { authentication } from '../../../src/middleware/authentication.middleware';

import { MOCK_REDIRECT_MESSAGE as MOCK_REDIRECT_MESSAGE, MOCK_POST_ADD_TEAM_RESPONSE, MOCK_GET_ADD_TEAM_RESPONSE } from '../../mock/text.mock';
import { MOCK_POST_ADD_TEAM } from '../../mock/data';

jest.mock('../../../src/utils/logger', () => ({
    log: {
        info: jest.fn()
    }
}));

const mockedLogger = logger as jest.Mock<typeof logger>;
mockedLogger.mockImplementation((_req: Request, _res: Response, next: NextFunction) => next());
const mockedAuth = authentication as jest.Mock<typeof authentication>;
mockedAuth.mockImplementation((_req: Request, _res: Response, next: NextFunction) => next());

describe('add-team endpoint integration tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET tests', () => {
        test('renders the add-team page', async () => {
            const res = await request(app).get(config.ADD_TEAM_URL);

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_GET_ADD_TEAM_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });
    describe('POST tests', () => {
        test('Should redirect to landing page after POST request', async () => {
            const res = await request(app).post(config.ADD_TEAM_URL).send(MOCK_POST_ADD_TEAM);

            expect(res.status).toEqual(302);
            expect(res.text).toContain(MOCK_REDIRECT_MESSAGE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should log the Team Name and Team Maintainer GitHub handle on POST request.', async () => {
            const res = await request(app).post(config.ADD_TEAM_URL).send(MOCK_POST_ADD_TEAM);

            const mockLog = log.info as jest.Mock;

            expect(res.text).toContain(MOCK_REDIRECT_MESSAGE);
            expect(mockLog).toBeCalledWith(MOCK_POST_ADD_TEAM_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });
});
