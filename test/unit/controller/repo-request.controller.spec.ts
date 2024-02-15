jest.mock('../../../src/utils/logger');
import { describe, expect, afterEach, test, jest } from '@jest/globals';
import { Request, Response } from 'express';

import { get, post } from '../../../src/controller/repo-request.controller';
import * as config from '../../../src/config';
import { log } from '../../../src/utils/logger';

import { MOCK_POST_REPO_REQUEST } from '../../mock/data';
import { MOCK_POST_REPO_REQUEST_RESPONSE } from '../../mock/text.mock';

const req = {
    body: MOCK_POST_REPO_REQUEST
} as Request;

const mockResponse = () => {
    const res = {} as Response;
    res.render = jest.fn().mockReturnValue(res) as any;
    res.redirect = jest.fn().mockReturnValue(res) as any;
    return res;
};

describe('repo-request controller test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('repo-request GET tests', () => {

        test('should render repo request page', () => {
            const res = mockResponse();

            get(req, res);

            expect(res.render).toHaveBeenCalledWith(config.REPO_REQUEST);
        });
    });

    describe('repo-request POST tests', () => {

        test('should redirect to home page on POST request', () => {
            const res = mockResponse();

            post(req, res);

            expect(res.redirect).toBeCalledWith(config.HOME);
        });
        test('should log Repository Name on POST request', () => {
            const res = mockResponse();

            const mockLogInfo = log.info as jest.Mock;

            post(req, res);

            expect(mockLogInfo).toHaveBeenCalledWith(MOCK_POST_REPO_REQUEST_RESPONSE);
        });
    });
});
