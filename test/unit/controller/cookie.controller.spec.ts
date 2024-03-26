import { describe, expect, afterEach, test, jest } from '@jest/globals';

import { get } from '../../../src/controller/cookies.controller';
import { mockRequest, mockResponse } from '../../mock/express.mock';

describe('Cookie controller test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should render cookie template', () => {
        const req = mockRequest();
        const res = mockResponse();

        get(req, res);

        expect(res.render).toHaveBeenCalledTimes(1);
    });
});
