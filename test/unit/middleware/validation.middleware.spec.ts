jest.mock('express-validator');
jest.mock('../../../src/utils/logger');

import { describe, expect, test, jest, afterEach, beforeEach } from '@jest/globals';
import { Request } from 'express';
import { validationResult } from 'express-validator';

import * as config from '../../../src/config';

import { checkValidations } from '../../../src/middleware/validation.middleware';
import { ErrorMessages } from '../../../src/validation/error.messages';
import { MOCK_ERROR, MOCK_POST_REMOVE_MEMBER } from '../../mock/data';
import { mockID } from '../../mock/session.mock';
import {
    mockLogInfo,
    mockLogErrorRequest
} from '../../mock/log.mock';
import { mockNext, mockResponse } from '../../mock/express.mock';

const validationResultMock = validationResult as unknown as jest.Mock;

const mockRequest = () => {
    const req = {} as Request;
    req.path = config.REMOVE_MEMBER_URL;
    req.body = MOCK_POST_REMOVE_MEMBER;
    req.params = { [config.ID]: mockID };
    return req;
};

describe('Validation Middleware test suites', () => {

    let res: any, req: any;

    beforeEach(() => {
        res = mockResponse();
        req = mockRequest();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should call next if errorList is empty', () => {
        validationResultMock.mockImplementationOnce(() => { return { isEmpty: () => true }; });
        checkValidations(req, res, mockNext);

        expect(mockLogInfo).toBeCalledTimes(0);
        expect(mockLogErrorRequest).toBeCalledTimes(0);
        expect(mockNext).toHaveBeenCalledTimes(1);
    });

    test(`should call res.render with ${config.REMOVE_MEMBER} view if errorList is not empty and id empty`, () => {
        const fieldKey = 'github_handle';
        validationResultMock.mockImplementationOnce(() => {
            return {
                isEmpty: () => false,
                array: () => [{ path: fieldKey, msg: ErrorMessages.GIT_HANDLE }]
            };
        });
        req.body[fieldKey] = '';
        req.params[config.ID] = '';
        checkValidations(req, res, mockNext);

        expect(mockLogInfo).toHaveBeenCalledTimes(1);
        expect(mockLogInfo).toHaveBeenCalledWith(`Validation error on ${config.REMOVE_MEMBER} page`);

        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith(config.REMOVE_MEMBER, {
            ...req.body,
            [config.ID]: '',
            errors: {
                errorList: [{ 'href': `#${fieldKey}`, 'text': ErrorMessages.GIT_HANDLE }],
                [fieldKey]: { 'text': ErrorMessages.GIT_HANDLE }
            }
        });
    });

    test(`should call res.render with ${config.REMOVE_MEMBER} view if errorList and id is not empty`, () => {
        const fieldKey = 'github_handle';
        req.body[fieldKey] = '';
        req.path = `${config.REMOVE_MEMBER_URL}/${mockID}`;
        validationResultMock.mockImplementationOnce(() => {
            return {
                isEmpty: () => false,
                array: () => [{ path: fieldKey, msg: ErrorMessages.GIT_HANDLE }]
            };
        });
        checkValidations(req, res, mockNext);

        expect(mockLogInfo).toHaveBeenCalledTimes(1);
        expect(mockLogInfo).toHaveBeenCalledWith(`Validation error on ${config.REMOVE_MEMBER} page`);

        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith(config.REMOVE_MEMBER, {
            ...req.body,
            [config.ID]: mockID,
            errors: {
                errorList: [{ 'href': `#${fieldKey}`, 'text': ErrorMessages.GIT_HANDLE }],
                [fieldKey]: { 'text': ErrorMessages.GIT_HANDLE }
            }
        });
    });

    test('should catch the error log error message and call next(err)', () => {
        validationResultMock.mockImplementationOnce(() => { throw new Error(MOCK_ERROR.message); });
        checkValidations(req, res, mockNext);

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockLogErrorRequest).toHaveBeenCalledTimes(1);
        expect(mockLogErrorRequest).toHaveBeenCalledWith(req, MOCK_ERROR.message);
    });
});
