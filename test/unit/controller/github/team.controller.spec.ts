jest.mock('../../../../src/utils/logger');
jest.mock('../../../../src/utils/getPreviousPageUrl');
jest.mock('@co-digital/login');
jest.mock('uuid');

import { describe, expect, afterEach, test, jest } from '@jest/globals';

import { get, getById, post, postById, removeById } from '../../../../src/controller/github/team.controller';
import { TeamKey } from '../../../../src/model/github/team.model';
import * as config from '../../../../src/config';

import { getPreviousPageUrl } from '../../../../src/utils/getPreviousPageUrl';

import { MOCK_POST_TEAM } from '../../../mock/data';
import { MOCK_POST_TEAM_RESPONSE, MOCK_LOG_ERROR_REQUEST, MOCK_BY_ID_TEAM_RESPONSE } from '../../../mock/text.mock';
import { mockRequest, mockResponse, mockNext, mockBadRequest } from '../../../mock/express.mock';

import {
    mockGetApplicationDataByID,
    mockID,
    mockRemoveApplicationDataByID,
    mockSetApplicationDataByID,
    mockSetApplicationDataKey,
    mockUuidv4
} from '../../../mock/session.mock';
import {
    mockLogInfo,
    mockLogErrorRequest
} from '../../../mock/log.mock';

const mockGetPreviousPageUrl = getPreviousPageUrl as jest.Mock;

describe('team controller test suites', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('team GET tests', () => {

        test('should render team page', () => {
            const res = mockResponse();
            const req = mockRequest();

            get(req, res);

            expect(res.render).toHaveBeenCalledWith(config.TEAM);
        });
    });

    describe('team POST tests', () => {

        test('should redirect to github-home page on POST request', () => {
            mockUuidv4.mockImplementation(_ => mockID);
            const res = mockResponse();
            const req = { ...mockRequest(MOCK_POST_TEAM), session: {} } as any;

            post(req, res, mockNext);

            expect(mockSetApplicationDataKey).toHaveBeenCalledWith(req.session, {
                id: mockID,
                ...MOCK_POST_TEAM
            }, TeamKey);

            expect(res.redirect).toBeCalledWith(config.GITHUB_HOME_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log Team Name and Team Maintainer GitHub handle on POST request', () => {
            const res = mockResponse();
            const req = mockRequest(MOCK_POST_TEAM);
            mockUuidv4.mockImplementationOnce(_ => mockID);

            post(req, res, mockNext);

            expect(mockSetApplicationDataKey).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_POST_TEAM_RESPONSE}${mockID}`);
            expect(mockNext).not.toHaveBeenCalled();

        });

        test('should log error request and call next', () => {
            const res = mockResponse();

            post(mockBadRequest, res, mockNext);

            expect(mockLogErrorRequest).toHaveBeenCalledWith(
                mockBadRequest,
                `${MOCK_LOG_ERROR_REQUEST} (reading 'team_name')`);
            expect(mockNext).toBeCalledTimes(1);
        });
    });

    describe('team POST ById tests', () => {

        test('should redirect to previous page on POST ById request', () => {

            mockGetPreviousPageUrl.mockReturnValue(config.CHECK_YOUR_REQUESTS_URL);

            const res = mockResponse();
            const req = {
                ...mockRequest(MOCK_POST_TEAM),
                session: {},
                params: { id: mockID },
                query: { previousPage: config.CHECK_YOUR_REQUESTS_URL }
            } as any;

            postById(req, res, mockNext);

            expect(mockSetApplicationDataByID).toHaveBeenCalledWith(req.session, {
                id: mockID,
                ...MOCK_POST_TEAM
            }, TeamKey, mockID);
            expect(mockGetPreviousPageUrl).toHaveBeenCalledWith(req);

            expect(res.redirect).toBeCalledWith(config.CHECK_YOUR_REQUESTS_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log team details on POST ById request', () => {
            const res = mockResponse();
            const req = {
                ...mockRequest(MOCK_POST_TEAM),
                params: { id: mockID }
            } as any;

            postById(req, res, mockNext);

            expect(mockSetApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_BY_ID_TEAM_RESPONSE}${mockID}`);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log error request and call next', () => {
            const res = mockResponse();

            postById(mockBadRequest, res, mockNext);

            expect(mockLogErrorRequest).toHaveBeenCalledWith(
                mockBadRequest,
                `${MOCK_LOG_ERROR_REQUEST} (reading 'team_name')`);
            expect(mockNext).toBeCalledTimes(1);
        });
    });

    describe('team GET ById tests', () => {

        test('should render team template', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;
            mockGetApplicationDataByID.mockImplementationOnce( _ => MOCK_POST_TEAM);

            getById(req, res, mockNext);

            expect(mockGetApplicationDataByID).toHaveBeenCalledWith(req.session, TeamKey, mockID);

            expect(res.render).toBeCalledWith(
                config.TEAM,
                { ...MOCK_POST_TEAM, [config.ID]: mockID }
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log team details on GET ById request', () => {
            const res = mockResponse();
            const req = {
                params: { id: mockID }
            } as any;
            mockGetApplicationDataByID.mockImplementationOnce( _ => MOCK_POST_TEAM);

            getById(req, res, mockNext);
            expect(mockGetApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_BY_ID_TEAM_RESPONSE}${mockID}`);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log error request and call next', () => {
            const res = mockResponse();

            getById(mockBadRequest, res, mockNext);

            expect(mockLogErrorRequest).toHaveBeenCalledWith(
                mockBadRequest,
                `${MOCK_LOG_ERROR_REQUEST} (reading 'id')`);
            expect(mockNext).toBeCalledTimes(1);
        });
    });

    describe('team REMOVE ById tests', () => {

        test('should redirect to github-home page', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;

            removeById(req, res, mockNext);

            expect(mockRemoveApplicationDataByID).toHaveBeenCalledWith(req.session, TeamKey, mockID);

            expect(res.redirect).toBeCalledWith(config.GITHUB_HOME_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log team details on Remove ById request', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;

            removeById(req, res, mockNext);

            expect(mockRemoveApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`Team ID: ${mockID}`);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log error request and call next', () => {
            const res = mockResponse();

            removeById(mockBadRequest, res, mockNext);

            expect(mockLogErrorRequest).toHaveBeenCalledWith(
                mockBadRequest,
                `${MOCK_LOG_ERROR_REQUEST} (reading 'id')`);
            expect(mockNext).toBeCalledTimes(1);
        });
    });

});
