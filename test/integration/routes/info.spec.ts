jest.mock('../../../src/middleware/logger.middleware');
jest.mock('../../../src/utils/logger');

import { jest, beforeEach, describe, expect, test } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import request from 'supertest';

import app from '../../../src/app';
import * as config from '../../../src/config';
import { logger } from '../../../src/middleware/logger.middleware';
import { MOCK_GET_INFO_RESPONSE, MOCK_POST_INFO_RESPONSE } from '../../mock/text.mock';

const mockedLogger = logger as jest.Mock<typeof logger>;
mockedLogger.mockImplementation((req: Request, res: Response, next: NextFunction) => next());

describe('Info endpoint integration tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET tests', () => {
        test('renders the info page', async () => {
            const res = await request(app).get(config.INFO_URL);

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_GET_INFO_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
        });
    });
    describe('POST tests', () => {
        test('Sends post request test', async () => {
            const res = await request(app).post(config.INFO_URL);

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_POST_INFO_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
        });
    });
});
