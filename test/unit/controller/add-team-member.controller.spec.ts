jest.mock('../../../src/utils/logger');
jest.mock('@co-digital/login');
jest.mock('uuid');

import { describe, expect, afterEach, test, jest } from '@jest/globals';

import { get, getById, post, postById, removeById } from '../../../src/controller/add-team-member.controller';
import { AddTeamMemberKey } from '../../../src/model/add-team-member.model';

import * as config from '../../../src/config';

import { MOCK_POST_ADD_TEAM_MEMBER } from '../../mock/data';
import { MOCK_POST_ADD_TEAM_MEMBER_RESPONSE, MOCK_LOG_ERROR_REQUEST, MOCK_BY_ID_TEAM_MEMBER_RESPONSE } from '../../mock/text.mock';
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

describe('add-team-member controller test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('add-team-member GET tests', () => {

        test('should render add-team-member page', () => {
            const res = mockResponse();
            const req = mockRequest();

            get(req, res);

            expect(res.render).toHaveBeenCalledWith(config.ADD_TEAM_MEMBER);
        });
    });

    describe('add-team-member POST tests', () => {

        test('should redirect to home page on POST request', () => {
            mockUuidv4.mockImplementation(_ => mockID);
            const res = mockResponse();
            const req = { ...mockRequest(MOCK_POST_ADD_TEAM_MEMBER), session: {} } as any;

            post(req, res, mockNext);

            expect(mockSetApplicationDataKey).toHaveBeenCalledWith(req.session, {
                id: mockID,
                ...MOCK_POST_ADD_TEAM_MEMBER
            }, AddTeamMemberKey);

            expect(res.redirect).toBeCalledWith(config.HOME_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });
        test('should log Team Name, Team Member GitHub handle on POST request', () => {
            const res = mockResponse();
            const req = mockRequest(MOCK_POST_ADD_TEAM_MEMBER);
            mockUuidv4.mockImplementationOnce(_ => mockID);

            post(req, res, mockNext);

            expect(mockSetApplicationDataKey).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(MOCK_POST_ADD_TEAM_MEMBER_RESPONSE);
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
    describe('add-team-member GET ById tests', () => {

        test('should render add-team-member template', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;
            mockGetApplicationDataByID.mockImplementationOnce( _ => MOCK_POST_ADD_TEAM_MEMBER);

            getById(req, res, mockNext);

            expect(mockGetApplicationDataByID).toHaveBeenCalledWith(req.session, AddTeamMemberKey, mockID);

            expect(res.render).toBeCalledWith(
                config.ADD_TEAM_MEMBER,
                { ...MOCK_POST_ADD_TEAM_MEMBER, [config.ID]: mockID }
            );
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log add-team-member details on GET ById request', () => {
            const res = mockResponse();
            const req = {
                params: { id: mockID }
            } as any;
            mockGetApplicationDataByID.mockImplementationOnce( _ => MOCK_POST_ADD_TEAM_MEMBER);

            getById(req, res, mockNext);
            expect(mockGetApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_BY_ID_TEAM_MEMBER_RESPONSE}${mockID}`);
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

    describe('add-team-member POST ById tests', () => {

        test('should redirect to home page on POST ById request', () => {
            const res = mockResponse();
            const req = {
                ...mockRequest(MOCK_POST_ADD_TEAM_MEMBER),
                session: {},
                params: { id: mockID }
            } as any;

            postById(req, res, mockNext);

            expect(mockSetApplicationDataByID).toHaveBeenCalledWith(req.session, {
                id: mockID,
                ...MOCK_POST_ADD_TEAM_MEMBER
            }, AddTeamMemberKey, mockID);

            expect(res.redirect).toBeCalledWith(config.HOME_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log add-team-member details on POST ById request', () => {
            const res = mockResponse();
            const req = {
                ...mockRequest(MOCK_POST_ADD_TEAM_MEMBER),
                params: { id: mockID }
            } as any;

            postById(req, res, mockNext);

            expect(mockSetApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_BY_ID_TEAM_MEMBER_RESPONSE}${mockID}`);
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
    describe('add-team-member REMOVE ById tests', () => {

        test('should redirect to home page', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;

            removeById(req, res, mockNext);

            expect(mockRemoveApplicationDataByID).toHaveBeenCalledWith(req.session, AddTeamMemberKey, mockID);

            expect(res.redirect).toBeCalledWith(config.HOME_URL);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('should log add-team-member details on Remove ById request', () => {
            const res = mockResponse();
            const req = { params: { id: mockID } } as any;

            removeById(req, res, mockNext);

            expect(mockRemoveApplicationDataByID).toHaveBeenCalledTimes(1);
            expect(mockLogInfo).toHaveBeenCalledWith(`Team member ID: ${mockID}`);
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
