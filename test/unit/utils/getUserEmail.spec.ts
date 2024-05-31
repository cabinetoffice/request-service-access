jest.mock('@co-digital/login');

import { describe, test, expect, jest } from '@jest/globals';
import { getUserEmailFromColaJwt } from '@co-digital/login';
import { getUserEmail } from '../../../src/utils/getUserEmail';

import { MOCK_EMAIL } from '../../mock/text.mock';

const mockGetUserEmailFromColaJwt = getUserEmailFromColaJwt as jest.Mock;

describe('getUserEmail unit tests', () => {
    test('should return user email if JWT is valid', () => {
        const mockJwt = 'mocked-jwt-token';

        mockGetUserEmailFromColaJwt.mockReturnValue(MOCK_EMAIL);

        const email = getUserEmail(mockJwt);

        expect(email).toBe(MOCK_EMAIL);
        expect(mockGetUserEmailFromColaJwt).toHaveBeenCalledWith(mockJwt);
    });
    test('should throw error if JWT is invalid', () => {
        const mockJwt = 'invalid-jwt-token';
        mockGetUserEmailFromColaJwt.mockReturnValue(null);

        expect(() => getUserEmail(mockJwt)).toThrow('Failed to decode JWT or no email found in token.');
        expect(mockGetUserEmailFromColaJwt).toHaveBeenCalledWith(mockJwt);
    });
});
