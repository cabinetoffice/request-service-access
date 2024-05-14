jest.mock('express-rate-limit');

import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { rateLimit } from 'express-rate-limit';
import { configureRateLimit } from '../../../src/config/rate-limit';

import { MOCK_RATE_LIMIT_VALUE, MOCK_EXPRESS_APP } from '../../mock/data';

describe('Helmet Config test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should call rateLimit method and express app.use method', () => {
        const mockRateLimit = rateLimit as jest.Mock;

        configureRateLimit(MOCK_EXPRESS_APP);

        expect(mockRateLimit).toHaveBeenCalledTimes(1);
        expect(mockRateLimit).toHaveBeenCalledWith(MOCK_RATE_LIMIT_VALUE);
        expect(MOCK_EXPRESS_APP.use).toHaveBeenCalled();
    });
});
