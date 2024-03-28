import { describe, expect, afterEach, test, jest } from '@jest/globals';

import { get } from '../../../src/controller/contact-us.controller';
import { mockRequest, mockResponse } from '../../mock/express.mock';

describe('Contact us controller test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should render contact us template', () => {
        const req = mockRequest();
        const res = mockResponse();

        get(req, res);

        expect(res.render).toHaveBeenCalledTimes(1);
    });
});
