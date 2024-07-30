jest.mock('../../../../src/utils/logger');
jest.mock('../../../../src/utils/getPreviousPageUrl');
jest.mock('@co-digital/login');
jest.mock('uuid');

import { describe, expect, afterEach, test, jest } from '@jest/globals';

import { get, getById, post, postById, removeById } from '../../../../src/controller/github/member.controller';
import { MemberKey } from '../../../../src/model/github/member.model';
import * as config from '../../../../src/config';

import { getPreviousPageUrl } from '../../../../src/utils/getPreviousPageUrl';

import { MOCK_POST_MEMBER } from '../../../mock/data';
import {
    MOCK_POST_MEMBER_RESPONSE,
    MOCK_BY_ID_MEMBER_RESPONSE,
    MOCK_LOG_ERROR_REQUEST
} from '../../../mock/text.mock';
import {
    mockBadRequest,
    mockRequest,
    mockResponse,
    mockNext
} from '../../../mock/express.mock';
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

describe('Member controller test suites', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('member GET tests', () => {

        test('should render member template', () => {
            const res = mockResponse();
            const req = mockRequest();

            get(req, res);

            expect(res.render).toHaveBeenCalledWith(config.MEMBER);
        });
    });

    describe('member POST tests', () => {

        test('should redirect to home page on POST request', () => {
            mockUuidv4.mockImplementation(_ => mockID);
            const res = mockResponse();
            const req = { ...mockRequest(MOCK_POST_MEMBER), session: {} } as any;

            post(req, res, mockNext);

            expect(mockSetApplicationDataKey).toHaveBeenCalledWith(req.session, {
                id: mockID,
                ...MOCK_POST_MEMBER
            }, MemberKey);

            expect(res.redirect).toBeCalledWith(config.HOME_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log member details on POST request', () => {
            mockUuidv4.mockImplementation(_ => mockID);
            const res = mockResponse();
            const req = mockRequest(MOCK_POST_MEMBER);

            post(req, res, mockNext);
            expect(mockSetApplicationDataKey).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(MOCK_POST_MEMBER_RESPONSE);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log member details with date on POST request', () => {
            mockUuidv4.mockImplementation(_ => mockID);
            const mockDate = '9999-12-31';
            const res = mockResponse();
            const req = mockRequest({
                ...MOCK_POST_MEMBER,
                contract_type: 'non_permanent',
                contract_end_date: mockDate
            });

            post(req, res, mockNext);
            expect(mockSetApplicationDataKey).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_POST_MEMBER_RESPONSE}${mockDate}`);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log error request and call next', () => {
            const res = mockResponse();

            post(mockBadRequest, res, mockNext);

            expect(mockLogErrorRequest).toHaveBeenCalledWith(
                mockBadRequest,
                `${MOCK_LOG_ERROR_REQUEST} (reading 'first_name')`);
            expect(mockNext).toBeCalledTimes(1);
        });
    });

    describe('member POST ById tests', () => {

        test('should redirect to previous page on POST ById request', () => {

            mockGetPreviousPageUrl.mockReturnValue(config.CHECK_YOUR_REQUESTS_URL);

            const res = mockResponse();
            const req = {
                ...mockRequest(MOCK_POST_MEMBER),
                session: {},
                params: { id: mockID },
                query: { previousPage: config.CHECK_YOUR_REQUESTS_URL }
            } as any;

            postById(req, res, mockNext);

            expect(mockSetApplicationDataByID).toHaveBeenCalledWith(req.session, {
                id: mockID,
                ...MOCK_POST_MEMBER
            }, MemberKey, mockID);
            expect(mockGetPreviousPageUrl).toHaveBeenCalledWith(req);

            expect(res.redirect).toBeCalledWith(config.CHECK_YOUR_REQUESTS_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log member details on POST ById request', () => {
            const res = mockResponse();
            const req = {
                ...mockRequest(MOCK_POST_MEMBER),
                params: { id: mockID }
            } as any;

            postById(req, res, mockNext);
            expect(mockSetApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_BY_ID_MEMBER_RESPONSE}${mockID}`);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log error request and call next', () => {
            const res = mockResponse();

            postById(mockBadRequest, res, mockNext);

            expect(mockLogErrorRequest).toHaveBeenCalledWith(
                mockBadRequest,
                `${MOCK_LOG_ERROR_REQUEST} (reading 'id')`);
            expect(mockNext).toBeCalledTimes(1);
        });
    });

    describe('member GET ById tests', () => {

        test('should render member template', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;
            mockGetApplicationDataByID.mockImplementationOnce( _ => MOCK_POST_MEMBER);

            getById(req, res, mockNext);

            expect(mockGetApplicationDataByID).toHaveBeenCalledWith(req.session, MemberKey, mockID);

            expect(res.render).toBeCalledWith(
                config.MEMBER,
                { ...MOCK_POST_MEMBER, [config.ID]: mockID }
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log member details on GET ById request', () => {
            const res = mockResponse();
            const req = {
                params: { id: mockID }
            } as any;
            mockGetApplicationDataByID.mockImplementationOnce( _ => MOCK_POST_MEMBER);

            getById(req, res, mockNext);
            expect(mockGetApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_BY_ID_MEMBER_RESPONSE}${mockID}`);
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

    describe('member REMOVE ById tests', () => {

        test('should redirect to home page', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;

            removeById(req, res, mockNext);

            expect(mockRemoveApplicationDataByID).toHaveBeenCalledWith(req.session, MemberKey, mockID);

            expect(res.redirect).toBeCalledWith(config.HOME_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log member details on Remove ById request', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;

            removeById(req, res, mockNext);

            expect(mockRemoveApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`Member ID: ${mockID}`);
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
