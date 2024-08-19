jest.mock('../../../src/utils/logger');
jest.mock('../../../src/utils/getPreviousPageUrl');
jest.mock('@co-digital/login');
jest.mock('uuid');

import { describe, expect, afterEach, test, jest } from '@jest/globals';

import { get, getById, post, postById, removeById } from '../../../src/controller/additional-requests.controller';
import { AdditionalRequestsKey } from '../../../src/model/additional-requests.model';
import * as config from '../../../src/config';

import { getPreviousPageUrl } from '../../../src/utils/getPreviousPageUrl';

import { MOCK_POST_ADDITIONAL_REQUESTS } from '../../mock/data';
import { MOCK_POST_ADDITIONAL_REQUESTS_RESPONSE, MOCK_LOG_ERROR_REQUEST, MOCK_BY_ID_ADDITIONAL_REQUESTS_RESPONSE } from '../../mock/text.mock';
import { mockRequest, mockResponse, mockNext, mockBadRequest } from '../../mock/express.mock';

import {
    mockGetApplicationDataByID,
    mockID,
    mockRemoveApplicationDataByID,
    mockSetApplicationDataByID,
    mockSetApplicationDataKey,
    mockUuidv4
} from '../../mock/session.mock';

import {
    mockLogInfo,
    mockLogErrorRequest
} from '../../mock/log.mock';

const mockGetPreviousPageUrl = getPreviousPageUrl as jest.Mock;

describe('additional-requests controller test suites', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('additional-requests GET tests', () => {

        test('should render additional-requests page', () => {
            const res = mockResponse();
            const req = mockRequest();

            get(req, res);

            expect(res.render).toHaveBeenCalledWith(config.ADDITIONAL_REQUESTS);
        });
    });

    describe('additional-requests POST tests', () => {

        test('should redirect to github-home page on POST request', () => {
            mockUuidv4.mockImplementation(_ => mockID);
            const res = mockResponse();
            const req = { ...mockRequest(MOCK_POST_ADDITIONAL_REQUESTS), session: {} } as any;

            post(req, res, mockNext);

            expect(mockSetApplicationDataKey).toHaveBeenCalledWith(req.session, {
                id: mockID,
                ...MOCK_POST_ADDITIONAL_REQUESTS
            }, AdditionalRequestsKey);

            expect(res.redirect).toBeCalledWith(config.GITHUB_HOME_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });
        test('should log Context on POST request', () => {
            const res = mockResponse();
            const req = mockRequest(MOCK_POST_ADDITIONAL_REQUESTS);
            mockUuidv4.mockImplementationOnce(_ => mockID);

            post(req, res, mockNext);

            expect(mockSetApplicationDataKey).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_POST_ADDITIONAL_REQUESTS_RESPONSE}${mockID}`);
            expect(mockNext).not.toHaveBeenCalled();
        });
        test('should log error request and call next', () => {
            const res = mockResponse();

            post(mockBadRequest, res, mockNext);

            expect(mockLogErrorRequest).toHaveBeenCalledWith(
                mockBadRequest,
                `${MOCK_LOG_ERROR_REQUEST} (reading 'context')`);
            expect(mockNext).toBeCalledTimes(1);
        });
    });

    describe('additional-requests POST ById tests', () => {

        test('should redirect to previous page on POST ById request', () => {

            mockGetPreviousPageUrl.mockReturnValue(config.CHECK_YOUR_REQUESTS_URL);

            const res = mockResponse();
            const req = {
                ...mockRequest(MOCK_POST_ADDITIONAL_REQUESTS),
                session: {},
                params: { id: mockID }
            } as any;

            postById(req, res, mockNext);

            expect(mockSetApplicationDataByID).toHaveBeenCalledWith(req.session, {
                id: mockID,
                ...MOCK_POST_ADDITIONAL_REQUESTS
            }, AdditionalRequestsKey, mockID);
            expect(mockGetPreviousPageUrl).toHaveBeenCalledWith(req);

            expect(res.redirect).toBeCalledWith(config.CHECK_YOUR_REQUESTS_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log additional-requests details on POST ById request', () => {
            const res = mockResponse();
            const req = {
                ...mockRequest(MOCK_POST_ADDITIONAL_REQUESTS),
                params: { id: mockID }
            } as any;

            postById(req, res, mockNext);

            expect(mockSetApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_BY_ID_ADDITIONAL_REQUESTS_RESPONSE}${mockID}`);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log error request and call next', () => {
            const res = mockResponse();

            postById(mockBadRequest, res, mockNext);

            expect(mockLogErrorRequest).toHaveBeenCalledWith(
                mockBadRequest,
                `${MOCK_LOG_ERROR_REQUEST} (reading 'context')`);
            expect(mockNext).toBeCalledTimes(1);
        });
    });

    describe('additional-requests GET ById tests', () => {

        test('should render additional-requests template', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;
            mockGetApplicationDataByID.mockImplementationOnce( _ => MOCK_POST_ADDITIONAL_REQUESTS);

            getById(req, res, mockNext);

            expect(mockGetApplicationDataByID).toHaveBeenCalledWith(req.session, AdditionalRequestsKey, mockID);

            expect(res.render).toBeCalledWith(
                config.ADDITIONAL_REQUESTS,
                { ...MOCK_POST_ADDITIONAL_REQUESTS, [config.ID]: mockID }
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log additional-requests details on GET ById request', () => {
            const res = mockResponse();
            const req = {
                params: { id: mockID }
            } as any;
            mockGetApplicationDataByID.mockImplementationOnce( _ => MOCK_POST_ADDITIONAL_REQUESTS);

            getById(req, res, mockNext);
            expect(mockGetApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_BY_ID_ADDITIONAL_REQUESTS_RESPONSE}${mockID}`);
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

    describe('additional-requests REMOVE ById tests', () => {

        test('should redirect to github-home page', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;

            removeById(req, res, mockNext);

            expect(mockRemoveApplicationDataByID).toHaveBeenCalledWith(req.session, AdditionalRequestsKey, mockID);

            expect(res.redirect).toBeCalledWith(config.GITHUB_HOME_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log additional-requests details on Remove ById request', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;

            removeById(req, res, mockNext);

            expect(mockRemoveApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`Additional Requests ID: ${mockID}`);
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
