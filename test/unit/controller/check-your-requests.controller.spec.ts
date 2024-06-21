jest.mock('../../../src/utils/logger');
jest.mock('@co-digital/api-sdk', () => ({
    createOAuthApiClient: jest.fn(() => ({
        gitHub: {
            postIssue: jest.fn()
        },
    })),
}));
jest.mock('@co-digital/login');
jest.mock('uuid');
jest.mock('../../../src/service/notify');
jest.mock('../../../src/service/dynamo');

import { describe, expect, afterEach, test, jest } from '@jest/globals';

import { get, post } from '../../../src/controller/check-your-requests.controller';
import * as config from '../../../src/config';

import { confirmationEmail } from '../../../src/service/notify';

import { MOCK_APP_DATA, MOCK_POST_ISSUE_URL, MOCK_EMAIL } from '../../mock/data';
import { MOCK_LOG_ERROR_REQUEST } from '../../mock/text.mock';
import { mockRequest, mockResponse, mockNext } from '../../mock/express.mock';
import { putSubmission } from '../../../src/service/dynamo';

import {
    mockGetSessionData, mockID, mockUuidv4
} from '../../mock/session.mock';
import {
    mockLogInfo,
    mockLogErrorRequest
} from '../../mock/log.mock';

import { client } from '../../../src/service/api';

const mockPostIssue = client.gitHub.postIssue as jest.Mock<any>;
const mockConfirmationEmail = confirmationEmail as jest.Mock;
const mockPutSubmission = putSubmission as jest.Mock;

describe('check-your-requests controller test suites', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('check-your-requests GET tests', () => {

        test('should render check-your-requests page', () => {
            const res = mockResponse();
            const req = mockRequest();
            mockGetSessionData.mockImplementation( _ => MOCK_APP_DATA);

            get(req, res, mockNext);

            expect(mockGetSessionData).toHaveBeenCalledTimes(1);
            expect(res.render).toHaveBeenCalledWith(config.CHECK_YOUR_REQUESTS, { ... MOCK_APP_DATA });
        });

        test('should log error request and call next', () => {
            const res = mockResponse();
            const req = undefined as any;

            get(req, res, mockNext);

            expect(mockLogErrorRequest).toHaveBeenCalledWith(
                req,
                `${MOCK_LOG_ERROR_REQUEST} (reading 'session')`);
            expect(mockNext).toBeCalledTimes(1);
        });
    });

    describe('check-your-requests POST tests', () => {

        test('should redirect to confirmation page on POST request', async () => {
            mockGetSessionData.mockImplementationOnce(_ => MOCK_APP_DATA);
            mockUuidv4.mockImplementation(_ => mockID);

            const res = mockResponse();
            res.locals.userEmail = MOCK_EMAIL;
            const req = { session: {} } as any;

            await post(req, res, mockNext);

            expect(mockGetSessionData).toHaveBeenCalledWith(req.session);
            expect(mockPostIssue).toHaveBeenCalledWith(
                MOCK_POST_ISSUE_URL, {
                    assignees: [config.GITHUB_REPO_ISSUE_ASSIGNEE],
                    labels: [config.GITHUB_REPO_ISSUE_ASSIGNEE],
                    title: `Github Request App #${mockID}`,
                    body: MOCK_APP_DATA
                }
            );

            expect(mockPutSubmission).toHaveBeenCalledTimes(1);
            expect(mockPutSubmission).toHaveBeenCalledWith(mockID, MOCK_EMAIL, MOCK_APP_DATA);

            expect(mockConfirmationEmail).toHaveBeenCalledTimes(1);
            expect(mockConfirmationEmail).toHaveBeenCalledWith(MOCK_EMAIL, mockID);

            expect(res.redirect).toBeCalledWith(`${config.CONFIRMATION_URL}/${mockID}`);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log Submit Issue and Id on POST request', async () => {
            mockGetSessionData.mockImplementationOnce( _ => MOCK_APP_DATA);
            mockUuidv4.mockImplementation(_ => mockID);
            const logMsg = `Submit Issue to ${MOCK_POST_ISSUE_URL}, ID: #${mockID}`;

            const res = mockResponse();
            res.locals.userEmail = MOCK_EMAIL;
            const req = mockRequest();

            await post(req, res, mockNext);

            expect(mockGetSessionData).toHaveBeenCalledTimes(1);

            expect(mockLogInfo).toHaveBeenCalledWith(logMsg);

            expect(res.redirect).toBeCalledWith(`${config.CONFIRMATION_URL}/${mockID}`);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log error request and call next', async () => {
            const res = mockResponse();
            const req = undefined as any;

            await post(req, res, mockNext);

            expect(mockLogErrorRequest).toHaveBeenCalledWith(
                req,
                `${MOCK_LOG_ERROR_REQUEST} (reading 'session')`);
            expect(mockNext).toBeCalledTimes(1);
        });
    });

});
