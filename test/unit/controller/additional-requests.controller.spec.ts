jest.mock('../../../src/utils/logger');

import { describe, expect, afterEach, test, jest } from '@jest/globals';

import { get, post } from '../../../src/controller/additional-requests.controller';
import * as config from '../../../src/config';
import { log } from '../../../src/utils/logger';

import { MOCK_POST_ADDITIONAL_REQUESTS } from '../../mock/data';
import { MOCK_POST_ADDITIONAL_REQUESTS_RESPONSE } from '../../mock/text.mock';
import { mockRequest, mockResponse, mockNext } from '../../mock/express.mock';

describe('additional-requests controller test suites', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('additional-requests GET tests', () => {

        test('should render additional-requests page', () => {

            const res = mockResponse();
            const req = mockRequest();

            get(req, res);

            expect(res.render).toHaveBeenCalledWith(config.ADDITIONAL_REQUESTS);
        });
    });

    describe('additional-requests POST tests', () => {

        test('should redirect to home page on POST request', () => {
            const res = mockResponse();
            const req = mockRequest(MOCK_POST_ADDITIONAL_REQUESTS);

            post(req, res, mockNext);

            expect(res.redirect).toBeCalledWith(config.HOME_URL);
        });
        test('should log Context on POST request', () => {
            const res = mockResponse();
            const req = mockRequest(MOCK_POST_ADDITIONAL_REQUESTS);

            const mockLogInfo = log.info as jest.Mock;

            post(req, res, mockNext);

            expect(mockLogInfo).toHaveBeenCalledWith(MOCK_POST_ADDITIONAL_REQUESTS_RESPONSE);

        });
    });
});
