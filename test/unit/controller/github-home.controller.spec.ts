jest.mock('../../../src/utils/logger');

import { describe, expect, afterEach, test, jest } from '@jest/globals';

import { get } from '../../../src/controller/github/github-home.controller';
import * as config from '../../../src/config';
import { mockNext, mockRequest, mockResponse } from '../../mock/express.mock';
import { mockLogErrorRequest } from '../../mock/log.mock';
import { MOCK_LOG_ERROR_REQUEST } from '../../mock/text.mock';

describe('Home controller test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should render home template', () => {
        const res = mockResponse();
        const req = mockRequest();

        get(req, res, mockNext);

        expect(res.render).toHaveBeenCalledWith(config.GITHUB_HOME, expect.anything());
    });

    test('should log error request and call next', () => {
        const res = mockResponse();
        const req = undefined as any;

        get(req, res, mockNext);

        expect(mockLogErrorRequest).toHaveBeenCalledWith(
            req,
            `${MOCK_LOG_ERROR_REQUEST} (reading 'session')`);
        expect(mockNext).toBeCalledTimes(1);
    });
});
