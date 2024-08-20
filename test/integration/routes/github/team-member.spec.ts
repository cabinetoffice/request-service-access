jest.mock('../../../../src/utils/logger');
jest.mock('../../../../src/middleware/logger.middleware');
jest.mock('../../../../src/middleware/authentication.middleware');

import { jest, beforeEach, describe, expect, test } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import request from 'supertest';

import app from '../../../../src/app';
import * as config from '../../../../src/config';
import { logger } from '../../../../src/middleware/logger.middleware';
import { log } from '../../../../src/utils/logger';
import { authentication } from '../../../../src/middleware/authentication.middleware';

import { MOCK_GITHUB_HOME_REDIRECT_MESSAGE, MOCK_POST_TEAM_MEMBER_RESPONSE, MOCK_GET_TEAM_MEMBER_RESPONSE } from '../../../mock/text.mock';
import { MOCK_POST_TEAM_MEMBER } from '../../../mock/data';

import { ErrorMessages } from '../../../../src/validation/error.messages';

const mockedLogger = logger as jest.Mock<typeof logger>;
mockedLogger.mockImplementation((_req: Request, _res: Response, next: NextFunction) => next());
const mockedAuth = authentication as jest.Mock<typeof authentication>;
mockedAuth.mockImplementation((_req: Request, _res: Response, next: NextFunction) => next());

describe('team-member endpoint integration tests', () => {

    const teamMemberEndpoint = config.GITHUB_URL + config.CREATE + config.TEAM_MEMBER_URL;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET tests', () => {
        test('renders the team-member page', async () => {
            const res = await request(app).get(teamMemberEndpoint);

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_GET_TEAM_MEMBER_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });
    describe('POST tests', () => {
        test('Should redirect to github-home page after POST request', async () => {
            const res = await request(app).post(teamMemberEndpoint).send(MOCK_POST_TEAM_MEMBER);

            expect(res.status).toEqual(302);
            expect(res.text).toContain(MOCK_GITHUB_HOME_REDIRECT_MESSAGE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should render the same page with error messages after POST request', async () => {
            const res = await request(app).post(teamMemberEndpoint).send({
                team_name: '',
                github_handle: ''
            });

            expect(res.status).toEqual(200);
            expect(res.text).toContain(ErrorMessages.TEAM_NAME);
            expect(res.text).toContain(ErrorMessages.GIT_HANDLE);
            expect(res.text).toContain(MOCK_GET_TEAM_MEMBER_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should log the Team Name and Team Member GitHub handle on POST request.', async () => {
            const res = await request(app).post(teamMemberEndpoint).send(MOCK_POST_TEAM_MEMBER);

            const mockLog = log.info as jest.Mock;

            expect(res.text).toContain(MOCK_GITHUB_HOME_REDIRECT_MESSAGE);
            expect(mockLog).toBeCalledWith(MOCK_POST_TEAM_MEMBER_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });

        test('Should log the team-member details on POST request.', async () => {
            const res = await request(app).post(teamMemberEndpoint).send(MOCK_POST_TEAM_MEMBER);

            const mockLog = log.info as jest.Mock;

            expect(mockLog).toBeCalledWith(MOCK_POST_TEAM_MEMBER_RESPONSE);
            expect(res.text).toContain(MOCK_GITHUB_HOME_REDIRECT_MESSAGE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
            expect(mockedAuth).toHaveBeenCalledTimes(1);
        });
    });
});
