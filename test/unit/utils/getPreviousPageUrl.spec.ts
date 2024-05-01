import { describe, afterEach, expect, test, jest } from '@jest/globals';

import { Request } from 'express';

import { getPreviousPageUrl } from '../../../src/utils/getPreviousPageUrl';
import * as config from '../../../src/config';

import { mockRequest } from '../../mock/express.mock';

describe('getPreviousPage test suite', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should return home page URL if the previousPage query param is not present', () => {

        const mockRequestWithNoQueryParam = { ...mockRequest(), query: {} } as unknown as Request;

        const previousPageUrl = getPreviousPageUrl(mockRequestWithNoQueryParam);

        expect(previousPageUrl).toBe(config.HOME_URL);

    });

    test('Should return check-your-answers page URL if the previousPage query param is present', () => {

        const mockRequestWithQueryParam = { ...mockRequest(), query: { previousPage: config.PREVIOUS_PAGE_QUERY_PARAM } } as unknown as Request;

        const previousPageUrl = getPreviousPageUrl(mockRequestWithQueryParam);

        expect(previousPageUrl).toBe(config.CHECK_YOUR_REQUESTS_URL);

    });
});
