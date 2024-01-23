import { describe, expect, test } from '@jest/globals';
import { log } from '../../../src/utils/logger';
import { ApplicationLogger } from '@co-digital/logging/lib/ApplicationLogger';

describe('log tests', () => {
    test('Should test the log object is defined of type ApplicationLogger', () => {
        expect(log).toBeDefined();
        expect(log).toBeInstanceOf(ApplicationLogger);
    });
});

