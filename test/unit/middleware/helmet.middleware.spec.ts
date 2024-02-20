jest.mock('helmet');

import { describe, expect, test, jest, afterEach } from '@jest/globals';
import express from 'express';
import helmet from 'helmet';

import { configureHelmet } from '../../../src/middleware/helmet.middleware';
import { MOCK_HELMET_VALUE } from '../../mock/data';

describe('Helmet Middleware test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should call helmet methos and next middleware', () => {
        const mockHelmet = helmet as unknown as jest.Mock;
        const mockApp = {
            use: jest.fn()
        } as unknown as express.Application;

        configureHelmet(mockApp);

        expect(mockHelmet).toHaveBeenCalledTimes(1);
        expect(mockHelmet).toHaveBeenCalledWith(MOCK_HELMET_VALUE);
    });
});
