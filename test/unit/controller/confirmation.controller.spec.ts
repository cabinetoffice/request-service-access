import { describe, expect, afterEach, test, jest } from '@jest/globals';

import { get } from '../../../src/controller/confirmation.controller';
import * as config from '../../../src/config';
import { mockID } from '../../mock/session.mock';
import { mockResponse } from '../../mock/express.mock';

describe('Confirmation controller test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should render confirmation template', () => {
        const res = mockResponse();
        const req = { params: { id: mockID } } as any;

        get(req, res);

        expect(res.render).toHaveBeenCalledWith(config.CONFIRMATION, { id: mockID });
    });
});
