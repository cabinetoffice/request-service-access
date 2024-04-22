import { describe, afterEach, expect, test, jest } from '@jest/globals';

import { Request } from 'express';

import { getPreviousPageUrl } from '../../../src/utils/getPreviousPageUrl';
import * as config from '../../../src/config';

import { mockRequest } from '../../mock/express.mock';

describe('getPreviousPage test suite', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should return home page URL if the previousPage query param value is /home', () => {

        const mockRequestWithHomeQueryParam = { ...mockRequest(), query: { previousPage: config.HOME_URL } } as unknown as Request;

        const previousPageUrl = getPreviousPageUrl(mockRequestWithHomeQueryParam);

        expect(previousPageUrl).toBe(config.HOME_URL);

    });

    test('Should return check-your-answers page URL if the previousPage query param value is /check-your-answers', () => {

        const mockRequestWithCheckYourAnswersQueryParam = { ...mockRequest(), query: { previousPage: config.CHECK_YOUR_REQUESTS_URL } } as unknown as Request;

        const previousPageUrl = getPreviousPageUrl(mockRequestWithCheckYourAnswersQueryParam);

        expect(previousPageUrl).toBe(config.CHECK_YOUR_REQUESTS_URL);

    });

    test('Should return home page URL if the previousPage query param is undefined', () => {

        const mockRequestWithNoQueryParams = mockRequest({});

        const previousPageUrl = getPreviousPageUrl(mockRequestWithNoQueryParams);

        expect(previousPageUrl).toBe(config.HOME_URL);

    });

    test('Should return home page URL if the previousPage query param is another page', () => {

        const mockRequestWithOtherPage = { ...mockRequest(), query: { previousPage: '/other-page' } } as unknown as Request;

        const previousPageUrl = getPreviousPageUrl(mockRequestWithOtherPage);

        expect(previousPageUrl).toBe(config.HOME_URL);

    });
});
