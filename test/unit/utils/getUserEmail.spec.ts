jest.mock('@co-digital/login');

import { describe, test, expect, jest } from '@jest/globals';
import { getUserEmailFromColaJwt } from '@co-digital/login';
import { getUserEmail } from '../../../src/utils/getUserEmail';

import { MOCK_JWT, MOCK_EMAIL } from '../../mock/data';

const mockGetUserEmailFromColaJwt = getUserEmailFromColaJwt as jest.Mock;

describe('getUserEmail unit tests', () => {
    test('should return user email if JWT is valid', () => {
        mockGetUserEmailFromColaJwt.mockReturnValue(MOCK_EMAIL);

        const email = getUserEmail(MOCK_JWT);

        expect(email).toBe(MOCK_EMAIL);
        expect(mockGetUserEmailFromColaJwt).toHaveBeenCalledWith(MOCK_JWT);
    });
    test('should throw error if JWT is invalid', () => {
        const mockInvalidJwt = 'invalid-jwt-token';
        mockGetUserEmailFromColaJwt.mockReturnValue(null);

        expect(() => getUserEmail(mockInvalidJwt)).toThrow('Failed to decode JWT or no email found in token.');
        expect(mockGetUserEmailFromColaJwt).toHaveBeenCalledWith(mockInvalidJwt);
    });
});
