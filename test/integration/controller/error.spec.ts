jest.mock('../../../src/controller/healthcheck.controller');
jest.mock('../../../src/utils/logger');

import { jest, beforeEach, describe, expect, test } from '@jest/globals';
import request from 'supertest';

import app from '../../../src/app';
import * as config from '../../../src/config';
import * as healthcheckController from '../../../src/controller/healthcheck.controller';
import {
    MOCK_NOT_FOUND_RESPONSE,
    MOCK_ERROR_MESSAGE,
    MOCK_SERVICE_UNAVAILABLE,
    MOCK_WRONG_URL
} from '../../mock/text.mock';

const mockGet = healthcheckController.get as jest.Mock;

describe('Error integration tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should render page not found if url not recognised', async () => {
        const res = await request(app).get(MOCK_WRONG_URL);

        expect(res.text).toContain(MOCK_NOT_FOUND_RESPONSE);
        expect(res.status).toEqual(404);
    });

    test('Should render the error page', async () => {
        mockGet.mockImplementationOnce(() => {
            throw new Error(MOCK_ERROR_MESSAGE);
        });
        const res = await request(app).get(config.HEALTHCHECK_URL);

        expect(res.status).toEqual(500);
        expect(res.text).toContain(MOCK_SERVICE_UNAVAILABLE);
    });
});
