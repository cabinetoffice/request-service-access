jest.mock('cors');

import { describe, expect, test, jest, afterEach } from '@jest/globals';
import cors from 'cors';

import { configureCors } from '../../../src/config/cors';
import { MOCK_CORS_VALUE, MOCK_EXPRESS_APP } from '../../mock/data';

describe('CORS Config test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should call cors method and express app.use method ', () => {
        const mockCors = cors as jest.Mock;

        configureCors(MOCK_EXPRESS_APP);

        expect(mockCors).toHaveBeenCalledTimes(1);
        expect(mockCors).toHaveBeenCalledWith(MOCK_CORS_VALUE);
        expect(MOCK_EXPRESS_APP.use).toHaveBeenCalled();
    });
});
