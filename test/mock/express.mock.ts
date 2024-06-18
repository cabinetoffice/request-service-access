import { NextFunction, Request, Response } from 'express';
import { MOCK_JWT_NAME, MOCK_JWT } from './data';

export const mockRequest = (body = {}) => {
    const req = {} as Request;
    req.body = { ...body };
    req.signedCookies = { [MOCK_JWT_NAME]: MOCK_JWT };
    return req;
};

export const mockBadRequest = {} as Request;

export const mockResponse = () => {
    const res = {} as Response;
    res.render = jest.fn().mockReturnValue(res) as any;
    res.redirect = jest.fn().mockReturnValue(res) as any;
    res.locals = {};
    return res;
};

export const mockNext = jest.fn() as NextFunction;
