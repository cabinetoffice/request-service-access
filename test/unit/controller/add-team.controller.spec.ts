jest.mock('@co-digital/login');
jest.mock('../../../src/utils/logger');

import { describe, expect, afterEach, test, jest } from '@jest/globals';
import { getSessionData, setSessionData } from '@co-digital/login';

import { get, post } from '../../../src/controller/add-team.controller';
import { AddTeamKey } from '../../../src/model/add-team.model';
import * as config from '../../../src/config';
import { log } from '../../../src/utils/logger';

import { MOCK_POST_ADD_TEAM } from '../../mock/data';
import { MOCK_POST_ADD_TEAM_RESPONSE, MOCK_POST_LOG_ERROR_REQUEST } from '../../mock/text.mock';
import { mockRequest, mockResponse, mockNext, mockBadRequest } from '../../mock/express.mock';

const mockSetSessionData = setSessionData as jest.Mock;
const mockGetSessionData = getSessionData as jest.Mock;

describe('add-team controller test suites', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('add-team GET tests', () => {

        test('should render add-team page', () => {
            const res = mockResponse();
            const req = mockRequest();

            get(req, res);

            expect(res.render).toHaveBeenCalledWith(config.ADD_TEAM);
        });
    });

    describe('add-team POST tests', () => {

        test('should redirect to home page on POST request', () => {
            const res = mockResponse();
            const req = { ...mockRequest(MOCK_POST_ADD_TEAM), session: {} } as any;

            post(req, res, mockNext);

            expect(mockSetSessionData).toHaveBeenCalledWith(req.session, {
                [AddTeamKey]: { ...MOCK_POST_ADD_TEAM }
            });
            expect(mockGetSessionData).toHaveBeenCalledWith(req.session);
            expect(res.redirect).toBeCalledWith(config.HOME);
        });

        test('should log Team Name and Team Maintainer GitHub handle on POST request', () => {
            const res = mockResponse();
            const req = mockRequest(MOCK_POST_ADD_TEAM);

            const mockLogInfo = log.info as jest.Mock;

            post(req, res, mockNext);

            expect(mockSetSessionData).toHaveBeenCalledTimes(1);
            expect(mockGetSessionData).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(MOCK_POST_ADD_TEAM_RESPONSE);
            expect(mockNext).not.toHaveBeenCalled();

        });

        test('should log error request and call next', () => {
            const res = mockResponse();

            const mockLogErrorRequest = log.errorRequest as jest.Mock;

            post(mockBadRequest, res, mockNext);

            expect(mockLogErrorRequest).toHaveBeenCalledWith(
                mockBadRequest,
                `${MOCK_POST_LOG_ERROR_REQUEST} (reading 'team_name')`);
            expect(mockNext).toBeCalledTimes(1);
        });
    });
});
