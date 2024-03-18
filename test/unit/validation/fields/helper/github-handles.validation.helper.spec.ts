import { validateGithubHandles } from '../../../../../src/validation/fields/helper/github-handles.validation.helper';

import { ErrorMessages } from '../../../../../src/validation/error.messages';

describe('validateGithubHandles unit tests', () => {
    test('should validate a single valid GitHub handle', () => {
        const validHandle = 'valid-handle';
        expect(validateGithubHandles(validHandle)).toBe(true);
    });

    test('should validate a GitHub handle with spaces eitherside of the handle', () => {
        const spacesHandle = ' valid-handle ';
        expect(validateGithubHandles(spacesHandle)).toBe(true);
    });

    test('should throw an error for an empty string', () => {
        expect(() => validateGithubHandles('')).toThrow(ErrorMessages.GIT_HANDLE);
    });

    test('should validate multiple valid GitHub handles', () => {
        const multipleValidHandles = 'handle1, handle2, handle-3';

        expect(validateGithubHandles(multipleValidHandles)).toBe(true);
    });

    test('should throw an error for invalid GitHub handle characters', () => {
        const invalidHandle = 'invalid_handle';

        expect(() => validateGithubHandles(invalidHandle)).toThrow(ErrorMessages.INVALID_GIT_HANDLE);
    });

    test('should throw an error for a GitHub handle that is too long', () => {
        const longHandle = 'a'.repeat(40);

        expect(() => validateGithubHandles(longHandle)).toThrow(ErrorMessages.INVALID_GIT_HANDLE);
    });

    test('should throw an error for multiple handles where one is invalid', () => {
        const oneInvalidHandle = 'handle1, h@ndle2, handle-3';

        expect(() => validateGithubHandles(oneInvalidHandle)).toThrow(ErrorMessages.INVALID_GIT_HANDLE);
    });

    test('should throw an error for consecutive hyphens', () => {
        const consecutiveHyphensHandle = 'handle--1';

        expect(() => validateGithubHandles(consecutiveHyphensHandle)).toThrow(ErrorMessages.INVALID_GIT_HANDLE);
    });
    test('should throw an error for a handle beginning with a hyphen', () => {
        const hypenStartHandle = '-handle1';

        expect(() => validateGithubHandles(hypenStartHandle)).toThrow(ErrorMessages.INVALID_GIT_HANDLE);
    });
});
