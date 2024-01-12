import { describe, expect, afterEach, test, jest } from '@jest/globals';
import { Request, Response } from 'express';

import { get, post } from '../../../src/controller/github-service.controller';
import { MOCK_POST_LANDING_RESPONSE } from '../../mock/text.mock';
import * as config from '../../../src/config';

const req = {} as Request;

const mockResponse = () => {
    const res = {} as Response;
    res.render = jest.fn().mockReturnValue(res) as any;
    res.send = jest.fn().mockReturnValue(res) as any;
    return res;
};

describe('Info controller tests', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should render the landing', () => {
        const res = mockResponse();

        get(req, res);

        expect(res.render).toBeCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith(config.LANDING_PAGE);
    });

    test('sends a post request', () => {
        const res = mockResponse();

        post(req, res);

        expect(res.send).toBeCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(MOCK_POST_LANDING_RESPONSE);
    });
});
