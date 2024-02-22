jest.mock('helmet');

import { describe, expect, test, jest, afterEach } from '@jest/globals';
import helmet from 'helmet';

import { configureHelmet } from '../../../src/config/helmet';
import { MOCK_HELMET_VALUE, MOCK_EXPRESS_APP } from '../../mock/data';

describe('Helmet Config test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should call helmet method and express app.use method', () => {
        const mockHelmet = helmet as unknown as jest.Mock;

        configureHelmet(MOCK_EXPRESS_APP);

        expect(mockHelmet).toHaveBeenCalledTimes(1);
        expect(mockHelmet).toHaveBeenCalledWith(MOCK_HELMET_VALUE);
        expect(MOCK_EXPRESS_APP.use).toHaveBeenCalled();
    });
});
