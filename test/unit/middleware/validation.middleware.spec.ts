jest.mock('express-validator');
jest.mock('../../../src/utils/logger');

import { describe, expect, test, jest, afterEach, beforeEach } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import * as config from '../../../src/config';

import { checkValidations } from '../../../src/middleware/validation.middleware';
import { ErrorMessages } from '../../../src/validation/error.messages';
import { MOCK_ERROR, MOCK_POST_REMOVE_MEMBER } from '../../mock/data';
import { log } from '../../../src/utils/logger';

const validationResultMock = validationResult as unknown as jest.Mock;
const logInfoMock = log.info as jest.Mock;
const logErrorMock = log.error as jest.Mock;

const mockResponse = () => {
    const res = {} as Response;
    res.render = jest.fn() as any;
    return res;
};
const mockRequest = () => {
    const req = {} as Request;
    req.path = config.REMOVE_MEMBER_URL;
    req.body = MOCK_POST_REMOVE_MEMBER;
    return req;
};
const next = jest.fn() as NextFunction;

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
        validationResultMock.mockImplementationOnce( () => { return { isEmpty: () => true };});
        checkValidations(req, res, next);

        expect(logInfoMock).toBeCalledTimes(0);
        expect(logErrorMock).toBeCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
    });

    test(`should call res.render with ${config.REMOVE_MEMBER} view if errorList is not empty`, () => {
        const fieldKey = 'github_handle';
        validationResultMock.mockImplementationOnce( () => {
            return {
                isEmpty: () => false,
                array: () => [ { path: fieldKey, msg: ErrorMessages.GIT_HANDLE } ]
            };
        });
        req.body[fieldKey] = '';
        checkValidations(req, res, next);

        expect(logInfoMock).toHaveBeenCalledTimes(1);
        expect(logInfoMock).toHaveBeenCalledWith(`Validation error on ${config.REMOVE_MEMBER} page`);
        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith(config.REMOVE_MEMBER, {
            ...req.body,
            errors: {
                errorList: [{ 'href': `#${fieldKey}`, 'text': ErrorMessages.GIT_HANDLE }],
                [fieldKey]: { 'text': ErrorMessages.GIT_HANDLE }
            }
        });
    });

    test('should catch the error log error message and call next(err)', () => {
        validationResultMock.mockImplementationOnce( () => { throw new Error(MOCK_ERROR.message); });
        checkValidations(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(logErrorMock).toHaveBeenCalledTimes(1);
        expect(logErrorMock).toHaveBeenCalledWith(MOCK_ERROR.message);
    });
});
