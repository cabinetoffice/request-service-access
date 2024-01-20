import { describe, test, expect } from '@jest/globals';

import { getEnvironmentValue } from '../../../src/utils/getEnvironmentValue';

describe('checkEnvironmentValue test suites', () => {

    test('It should return an environment value', () => {
        const envValue = getEnvironmentValue('TEST_KEY');
        expect(envValue).toBe('test');
    });

    test('It should sanitise the environment value', () => {
        const envValue = getEnvironmentValue('UNSANITISED_TEST_KEY');
        expect(envValue).toBe('test');
    });

    test('It should return default value if no environment value is present', () => {
        const envValue = getEnvironmentValue('MISSING_KEY', 'default');
        expect(envValue).toBe('default');
    });

    test('It should return environment value if both environment value and default value is present', () => {
        const envValue = getEnvironmentValue('TEST_KEY', 'default');
        expect(envValue).toBe('test');
    });

    test('It should throw error if there is no environment value or default value present', () => {
        expect(() => getEnvironmentValue('MISSING_KEY')).toThrow();
    });
});
