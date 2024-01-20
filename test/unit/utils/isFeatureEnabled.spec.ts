import { describe, test, expect } from '@jest/globals';

import { isFeatureEnabled } from '../../../src/utils/isFeatureEnabled';

describe('isFeaturedEnabled test suites', () => {

    test('it should return true boolean if flag passed in is the string "true"', () => {

        expect(isFeatureEnabled('true')).toBe(true);
    });

    test('it should return false if the flag passed in is not the string "true"', () => {

        expect(isFeatureEnabled('no')).toBe(false);
    });

});
