import { describe, expect, afterEach, test, jest } from '@jest/globals';
import { Request, Response } from 'express';

import { get } from '../../../src/controller/confirmation.controller';
import * as config from '../../../src/config';

const req = {} as Request;

const mockResponse = () => {
    const res = {} as Response;
    res.render = jest.fn().mockReturnValue(res) as any;
    return res;
};

describe('Confirmation controller test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should render confirmation template', () => {
        const res = mockResponse();

        get(req, res);

        expect(res.render).toHaveBeenCalledWith(config.CONFIRMATION);
    });
});
