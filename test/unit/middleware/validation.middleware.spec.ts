jest.mock('express-validator');
jest.mock('../../../src/utils/validateFilepath.ts');
jest.mock('../../../src/utils/logger');

import { describe, expect, test, jest, afterEach, beforeEach } from '@jest/globals';
import { Request } from 'express';
import { validationResult } from 'express-validator';

import * as config from '../../../src/config';

import { validateFilepath } from '../../../src/utils/validateFilepath';
import { checkValidations } from '../../../src/middleware/validation.middleware';
import { ErrorMessages } from '../../../src/validation/error.messages';
import { MOCK_ERROR, MOCK_POST_ADD_REPO } from '../../mock/data';
import { mockID } from '../../mock/session.mock';
import {
    mockLogInfo,
    mockLogErrorRequest
} from '../../mock/log.mock';
import { mockNext, mockResponse } from '../../mock/express.mock';

const validationResultMock = validationResult as unknown as jest.Mock;
const validateFilepathMock = validateFilepath as jest.Mock<typeof validateFilepath>;

const mockRequest = () => {
    const req = {} as Request;
    req.path = config.ADD_REPO_URL;
    req.body = MOCK_POST_ADD_REPO;
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

    test('Should call next if errorList is empty and validatedFilepath is falsey', () => {
        validationResultMock.mockImplementationOnce(() => { return { isEmpty: () => true }; });
        validateFilepathMock.mockImplementationOnce(() => undefined);
        checkValidations(req, res, mockNext);

        expect(mockLogInfo).toBeCalledTimes(0);
        expect(mockLogErrorRequest).toBeCalledTimes(0);
        expect(mockNext).toHaveBeenCalledTimes(1);
    });

    test(`should call res.render with ${config.ADD_REPO} view if errorList /  validatedFilepath is not empty and id empty`, () => {
        const fieldKey = 'repo_name';
        validationResultMock.mockImplementationOnce(() => {
            return {
                isEmpty: () => false,
                array: () => [{ path: fieldKey, msg: ErrorMessages.REPO_NAME }]
            };
        });
        validateFilepathMock.mockImplementationOnce(() => config.ADD_REPO_URL);
        req.body[fieldKey] = '';
        req.params[config.ID] = '';
        checkValidations(req, res, mockNext);

        expect(mockLogInfo).toHaveBeenCalledTimes(1);
        expect(mockLogInfo).toHaveBeenCalledWith(`Validation error on ${config.ADD_REPO} page`);

        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith(config.ADD_REPO, {
            ...req.body,
            [config.ID]: '',
            errors: {
                errorList: [{ 'href': `#${fieldKey}`, 'text': ErrorMessages.REPO_NAME }],
                [fieldKey]: { 'text': ErrorMessages.REPO_NAME }
            }
        });
    });

    test(`should call res.render with ${config.ADD_REPO} view if errorList, validatedFilepath and id is not empty`, () => {
        const fieldKey = 'repo_name';
        req.body[fieldKey] = '';
        validationResultMock.mockImplementationOnce(() => {
            return {
                isEmpty: () => false,
                array: () => [{ path: fieldKey, msg: ErrorMessages.REPO_NAME }]
            };
        });
        validateFilepathMock.mockImplementationOnce(() => `${config.ADD_REPO_URL}/${mockID}`);
        checkValidations(req, res, mockNext);

        expect(mockLogInfo).toHaveBeenCalledTimes(1);
        expect(mockLogInfo).toHaveBeenCalledWith(`Validation error on ${config.ADD_REPO} page`);

        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith(config.ADD_REPO, {
            ...req.body,
            [config.ID]: mockID,
            errors: {
                errorList: [{ 'href': `#${fieldKey}`, 'text': ErrorMessages.REPO_NAME }],
                [fieldKey]: { 'text': ErrorMessages.REPO_NAME }
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
