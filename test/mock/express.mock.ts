import { NextFunction, Request, Response } from 'express';

export const mockRequest = (body = {}) => {
    const req = {} as Request;
    req.body = { ...body };
    return req;
};

export const mockBadRequest = {} as Request;

export const mockResponse = () => {
    const res = {} as Response;
    res.render = jest.fn().mockReturnValue(res) as any;
    res.redirect = jest.fn().mockReturnValue(res) as any;
    return res;
};

export const mockNext = jest.fn() as NextFunction;
