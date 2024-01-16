jest.mock('../../../src/middleware/logger.middleware');
jest.mock('../../../src/utils/logger');

import { jest, beforeEach, describe, expect, test } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import request from 'supertest';

import app from '../../../src/app';
import * as config from '../../../src/config';
import { logger } from '../../../src/middleware/logger.middleware';

import { MOCK_OK_RESPONSE } from '../../mock/text.mock';

const mockedLogger = logger as jest.Mock<typeof logger>;
mockedLogger.mockImplementation((req: Request, res: Response, next: NextFunction) => next());

describe('Healthcheck endpoint integration tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET tests', () => {
        test('response with 200 OK', async () => {
            const res = await request(app).get(config.HEALTHCHECK_URL);

            expect(res.status).toEqual(200);
            expect(res.text).toContain(MOCK_OK_RESPONSE);
            expect(mockedLogger).toHaveBeenCalledTimes(1);
        });
    });
});
