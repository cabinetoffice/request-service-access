import { describe, afterEach, expect, test, jest } from '@jest/globals';

import path from 'path';

import { validateFilepath } from '../../../src/utils/validateFilepath';
import * as config from '../../../src/config/index';

describe('validateFilepath util tests', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    test(`should return a valid filepath which starts with ${config.ROOT_URL}`, () => {

        const validFilepath = '/home';

        const normalisedPath = validateFilepath(validFilepath);

        const expectedNormalisedPath = '/home';
        expect(normalisedPath).toBe(expectedNormalisedPath);

    });

    test(`should normalise a malicious filepath and return the normalised path if it starts with ${config.ROOT_URL}`, () => {

        const maliciousPathTraveralFilepath = '../../../home';

        const normalisedPath = validateFilepath(maliciousPathTraveralFilepath);

        const expectedNormalisedPath = '/home';
        expect(normalisedPath).toBe(expectedNormalisedPath);

    });

    test(`should throw error if filepath does not start with ${config.ROOT_URL}`, () => {

        const spyPathResolve = jest.spyOn(path, 'resolve');
        const filePathNotStartingWithRootUrl = 'home';
        spyPathResolve.mockReturnValue(filePathNotStartingWithRootUrl);

        expect(() => validateFilepath(filePathNotStartingWithRootUrl)).toThrow();

    });

});
