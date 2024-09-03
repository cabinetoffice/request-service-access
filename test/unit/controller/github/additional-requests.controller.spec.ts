jest.mock('../../../../src/utils/logger');
jest.mock('../../../../src/utils/getPreviousPageUrl');
jest.mock('@co-digital/login');
jest.mock('uuid');

import { describe, expect, afterEach, test, jest } from '@jest/globals';

import { get, getById, post, postById, removeById } from '../../../../src/controller/github/additional-request.controller';
import { AdditionalRequestKey } from '../../../../src/model/github/additional-request.model';
import * as config from '../../../../src/config';

import { getPreviousPageUrl } from '../../../../src/utils/getPreviousPageUrl';

import { MOCK_POST_ADDITIONAL_REQUEST } from '../../../mock/data';
import { MOCK_POST_ADDITIONAL_REQUEST_RESPONSE, MOCK_LOG_ERROR_REQUEST, MOCK_BY_ID_ADDITIONAL_REQUEST_RESPONSE } from '../../../mock/text.mock';
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

describe('additional-request controller test suites', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('additional-request GET tests', () => {

        test('should render additional-requests page', () => {
            const res = mockResponse();
            const req = mockRequest();

            get(req, res);

            expect(res.render).toHaveBeenCalledWith(config.ADDITIONAL_REQUEST);
        });
    });

    describe('additional-request POST tests', () => {

        test('should redirect to github-home page on POST request', () => {
            mockUuidv4.mockImplementation(_ => mockID);
            const res = mockResponse();
            const req = { ...mockRequest(MOCK_POST_ADDITIONAL_REQUEST), session: {} } as any;

            post(req, res, mockNext);

            expect(mockSetApplicationDataKey).toHaveBeenCalledWith(req.session, {
                id: mockID,
                ...MOCK_POST_ADDITIONAL_REQUEST
            }, AdditionalRequestKey);

            expect(res.redirect).toBeCalledWith(config.GITHUB_HOME_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });
        test('should log Context on POST request', () => {
            const res = mockResponse();
            const req = mockRequest(MOCK_POST_ADDITIONAL_REQUEST);
            mockUuidv4.mockImplementationOnce(_ => mockID);

            post(req, res, mockNext);

            expect(mockSetApplicationDataKey).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_POST_ADDITIONAL_REQUEST_RESPONSE}${mockID}`);
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
                ...mockRequest(MOCK_POST_ADDITIONAL_REQUEST),
                session: {},
                params: { id: mockID }
            } as any;

            postById(req, res, mockNext);

            expect(mockSetApplicationDataByID).toHaveBeenCalledWith(req.session, {
                id: mockID,
                ...MOCK_POST_ADDITIONAL_REQUEST
            }, AdditionalRequestKey, mockID);
            expect(mockGetPreviousPageUrl).toHaveBeenCalledWith(req);

            expect(res.redirect).toBeCalledWith(config.CHECK_YOUR_REQUESTS_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log additional-request details on POST ById request', () => {
            const res = mockResponse();
            const req = {
                ...mockRequest(MOCK_POST_ADDITIONAL_REQUEST),
                params: { id: mockID }
            } as any;

            postById(req, res, mockNext);

            expect(mockSetApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_BY_ID_ADDITIONAL_REQUEST_RESPONSE}${mockID}`);
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

    describe('additional-request GET ById tests', () => {

        test('should render additional-requests template', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;
            mockGetApplicationDataByID.mockImplementationOnce( _ => MOCK_POST_ADDITIONAL_REQUEST);

            getById(req, res, mockNext);

            expect(mockGetApplicationDataByID).toHaveBeenCalledWith(req.session, AdditionalRequestKey, mockID);

            expect(res.render).toBeCalledWith(
                config.ADDITIONAL_REQUEST,
                { ...MOCK_POST_ADDITIONAL_REQUEST, [config.ID]: mockID }
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log additional-requests details on GET ById request', () => {
            const res = mockResponse();
            const req = {
                params: { id: mockID }
            } as any;
            mockGetApplicationDataByID.mockImplementationOnce( _ => MOCK_POST_ADDITIONAL_REQUEST);

            getById(req, res, mockNext);
            expect(mockGetApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_BY_ID_ADDITIONAL_REQUEST_RESPONSE}${mockID}`);
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

    describe('additional-request REMOVE ById tests', () => {

        test('should redirect to github-home page', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;

            removeById(req, res, mockNext);

            expect(mockRemoveApplicationDataByID).toHaveBeenCalledWith(req.session, AdditionalRequestKey, mockID);

            expect(res.redirect).toBeCalledWith(config.GITHUB_HOME_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log additional-request details on Remove ById request', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;

            removeById(req, res, mockNext);

            expect(mockRemoveApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`Additional Request ID: ${mockID}`);
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
