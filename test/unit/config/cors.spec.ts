jest.mock('cors');

import { describe, expect, test, jest, afterEach } from '@jest/globals';
import express from 'express';
import cors from 'cors';

import { configureCors } from '../../../src/config/cors';
import { MOCK_CORS_VALUE } from '../../mock/data';

describe('CORS Middleware test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should call cors method and express app.use method ', () => {
        const mockCors = cors as jest.Mock;
        const mockApp = {
            use: jest.fn()
        } as unknown as express.Application;

        configureCors(mockApp);

        expect(mockCors).toHaveBeenCalledTimes(1);
        expect(mockCors).toHaveBeenCalledWith(MOCK_CORS_VALUE);
        expect(mockApp.use).toHaveBeenCalled();
    });
});
