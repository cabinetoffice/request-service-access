jest.mock('@co-digital/login');
jest.mock('../../../src/utils/logger');

import { describe, expect, afterEach, test, jest } from '@jest/globals';
import { getSessionData, setSessionData } from '@co-digital/login';

import { get, post } from '../../../src/controller/add-member.controller';
import { AddMemberKey } from '../../../src/model/add-member.model';
import * as config from '../../../src/config';
import { log } from '../../../src/utils/logger';

import { MOCK_POST_ADD_MEMBER } from '../../mock/data';
import { MOCK_POST_ADD_MEMBER_RESPONSE, MOCK_POST_LOG_ERROR_REQUEST } from '../../mock/text.mock';
import { mockBadRequest, mockRequest, mockResponse, mockNext } from '../../mock/express.mock';

// const req = {
//     body: MOCK_POST_ADD_MEMBER
// } as Request;

// const mockResponse = () => {
//     const res = {} as Response;
//     res.render = jest.fn().mockReturnValue(res) as any;
//     res.redirect = jest.fn().mockReturnValue(res) as any;
//     return res;
// };

// const next = jest.fn() as NextFunction;

const mockSetSessionData = setSessionData as jest.Mock;
const mockGetSessionData = getSessionData as jest.Mock;

describe('add member controller test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should render add member template', () => {
        const res = mockResponse();
        const req = mockRequest();

        get(req, res);

        expect(res.render).toHaveBeenCalledWith(config.ADD_MEMBER);
    });
});

describe('add-member POST tests', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should redirect to home page on POST request', () => {
        const res = mockResponse();
        const req = { ...mockRequest(MOCK_POST_ADD_MEMBER), session: {} } as any;

        post(req, res, mockNext);

        expect(mockSetSessionData).toHaveBeenCalledWith(req.session, {
            [AddMemberKey]: { ...MOCK_POST_ADD_MEMBER }
        });
        expect(mockGetSessionData).toHaveBeenCalledWith(req.session);
        expect(res.redirect).toBeCalledWith(config.HOME);
        expect(mockNext).not.toHaveBeenCalled();
    });

    test('should log add-member details on POST request', () => {
        const res = mockResponse();
        const req = mockRequest(MOCK_POST_ADD_MEMBER);

        const mockLogInfo = log.info as jest.Mock;

        post(req, res, mockNext);
        expect(mockSetSessionData).toHaveBeenCalledTimes(1);
        expect(mockGetSessionData).toHaveBeenCalledTimes(1);
        expect(mockLogInfo).toHaveBeenCalledWith(MOCK_POST_ADD_MEMBER_RESPONSE);
        expect(mockNext).not.toHaveBeenCalled();
    });

    test('should log add-member details with date on POST request', () => {
        const mockDate = '9999-12-31';
        const res = mockResponse();
        const req = mockRequest({
            ...MOCK_POST_ADD_MEMBER,
            contract_type: 'non_permanent',
            contract_end_date: mockDate
        });

        const mockLogInfo = log.info as jest.Mock;

        post(req, res, mockNext);
        expect(mockSetSessionData).toHaveBeenCalledTimes(1);
        expect(mockGetSessionData).toHaveBeenCalledTimes(1);
        expect(mockLogInfo).toHaveBeenCalledWith(`${MOCK_POST_ADD_MEMBER_RESPONSE}${mockDate}`);
        expect(mockNext).not.toHaveBeenCalled();
    });

    test('should log error request and call next', () => {
        const res = mockResponse();

        const mockLogErrorRequest = log.errorRequest as jest.Mock;

        post(mockBadRequest, res, mockNext);

        expect(mockLogErrorRequest).toHaveBeenCalledWith(
            mockBadRequest,
            `${MOCK_POST_LOG_ERROR_REQUEST} (reading 'first_name')`);
        expect(mockNext).toBeCalledTimes(1);
    });
});

