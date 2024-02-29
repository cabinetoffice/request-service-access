jest.mock('@co-digital/login');
jest.mock('../../../src/utils/logger');

import { describe, expect, afterEach, test, jest } from '@jest/globals';
import { getSessionData, setSessionData } from '@co-digital/login';

import { get, post } from '../../../src/controller/add-repo.controller';
import { AddRepoKey } from '../../../src/model/add-repo.model';
import * as config from '../../../src/config';
import { log } from '../../../src/utils/logger';

import { MOCK_POST_ADD_REPO } from '../../mock/data';
import { MOCK_POST_LOG_ERROR_REQUEST, MOCK_POST_ADD_REPO_RESPONSE } from '../../mock/text.mock';
import { mockBadRequest, mockRequest, mockResponse, mockNext } from '../../mock/express.mock';

const mockSetSessionData = setSessionData as jest.Mock;
const mockGetSessionData = getSessionData as jest.Mock;

describe('Add-repo controller test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('add-repo GET tests', () => {

        test('should render add-repo page', () => {
            const res = mockResponse();
            const req = mockRequest();

            get(req, res);

            expect(res.render).toHaveBeenCalledWith(config.ADD_REPO);
        });
    });

    describe('add-repo POST tests', () => {

        test('should redirect to home page on POST request', () => {
            const res = mockResponse();
            const req = { ...mockRequest(MOCK_POST_ADD_REPO), session: {} } as any;

            post(req, res, mockNext);

            expect(mockSetSessionData).toHaveBeenCalledWith(req.session, {
                [AddRepoKey]: { ...MOCK_POST_ADD_REPO }
            });
            expect(mockGetSessionData).toHaveBeenCalledWith(req.session);
            expect(res.redirect).toBeCalledWith(config.HOME);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log Repository Name, Visibility and Description on POST request', () => {
            const res = mockResponse();
            const req = mockRequest(MOCK_POST_ADD_REPO);

            const mockLogInfo = log.info as jest.Mock;

            post(req, res, mockNext);
            expect(mockSetSessionData).toHaveBeenCalledTimes(1);
            expect(mockGetSessionData).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(MOCK_POST_ADD_REPO_RESPONSE);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log error request and call next', () => {
            const res = mockResponse();

            const mockLogErrorRequest = log.errorRequest as jest.Mock;

            post(mockBadRequest, res, mockNext);

            expect(mockLogErrorRequest).toHaveBeenCalledWith(
                mockBadRequest,
                `${MOCK_POST_LOG_ERROR_REQUEST} (reading 'repo_name')`);
            expect(mockNext).toBeCalledTimes(1);
        });
    });
});
