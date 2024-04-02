import { describe, expect, afterEach, test, jest } from '@jest/globals';

import { get } from '../../../src/controller/accessibilty-statement-controller';
import { mockRequest, mockResponse } from '../../mock/express.mock';

describe('Accessibility statement controller test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should render accessibility template', () => {
        const req = mockRequest();
        const res = mockResponse();

        get(req, res);

        expect(res.render).toHaveBeenCalledTimes(1);
    });
});
