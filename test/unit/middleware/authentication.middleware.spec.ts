jest.mock('../../../src/utils/isFeatureEnabled');
jest.mock('../../../src/utils/logger', () => ({
    log: {
        infoRequest: jest.fn(),
        errorRequest: jest.fn()
    }
}));

import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';

import * as config from '../../../src/config';

import { authentication } from '../../../src/middleware/authentication.middleware';
import { log } from '../../../src/utils/logger';
import { isFeatureEnabled } from '../../../src/utils/isFeatureEnabled';

import { GET_REQUEST_MOCK } from '../../mock/data';

const logInfoRequestMock = log.infoRequest as jest.Mock;
const logErrorRequestMock = log.errorRequest as jest.Mock;
const isFeatureEnabledMock = isFeatureEnabled as jest.Mock;

const req = GET_REQUEST_MOCK as Request;
const mockResponse = () => {
    const res = {} as Response;
    res.render = jest.fn() as any;
    return res;
};
const next = jest.fn() as NextFunction;

describe('Authentication Middleware test suites', () => {

    let res: any;

    beforeEach(() => {
        res = mockResponse();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should call next if auth feature is enabled', () => {

        // enable auth flag
        isFeatureEnabledMock.mockReturnValue(true);

        authentication(req, res, next);

        expect(logInfoRequestMock).toHaveBeenCalledTimes(1);
        expect(logInfoRequestMock).toHaveBeenCalledWith(req, 'some auth here soon!');
        expect(next).toHaveBeenCalledTimes(1);
    });

    test('should call res.render with not-available view if auth feature is disabled', () => {

        // disable auth flag
        isFeatureEnabledMock.mockReturnValue(false);

        authentication(req, res, next);

        expect(logInfoRequestMock).toHaveBeenCalledTimes(1);
        expect(logInfoRequestMock).toHaveBeenCalledWith(req, 'sorry, auth service not available right now');
        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith(config.NOT_AVAILABLE);
    });

    test('should call next with error object if error is thrown', () => {

        // disable auth flag so res.render is called
        isFeatureEnabledMock.mockReturnValue(false);

        // force an error to be thrown by res.render
        const errMsg = 'Error thrown by res.render!';
        const resWithError = { ...res };
        resWithError.render = jest.fn(() => { throw new Error(errMsg); });

        authentication(req, resWithError, next);

        const errObj = expect.objectContaining({ message: errMsg });

        expect(logErrorRequestMock).toHaveBeenCalledTimes(1);
        expect(logErrorRequestMock).toHaveBeenCalledWith(req, errObj);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(errObj);
    });
});
