jest.mock('../../../src/controller/error.controller.ts');

import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';

import { errorHandler } from '../../../src/controller/error.controller';
import { rateLimitHandler } from '../../../src/middleware/rateLimitHandler.middleware';
import { mockRequest, mockResponse, mockNext } from '../../mock/express.mock';

const mockErrorHandler = errorHandler as jest.Mock;

describe('Rate Limit Handler test suites', () => {

    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        next = mockNext;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should call errorHandler with err, req, res and next parameters', () => {

        const err = new Error('Too Many Requests');
        rateLimitHandler(req, res, next);
        expect(mockErrorHandler).toHaveBeenCalledTimes(1);
        expect(mockErrorHandler).toHaveBeenCalledWith(err, req, res, next);

    });

    test('Should attach statusCode property to res object, with 429 value', () => {

        rateLimitHandler(req, res, next);
        expect(res.statusCode).toBe(429);

    });
});
