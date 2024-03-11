import { describe, test, expect } from '@jest/globals';
import { createOAuthApiClient } from '@co-digital/api-sdk';

import { client } from '../../../src/service/api';

describe('apiClient test suites', () => {
    test('Should return api-sdk client object', () => {
        expect(client).toEqual(createOAuthApiClient('key'));
    });
});
