jest.mock('helmet');

import { describe, expect, test, jest, afterEach } from '@jest/globals';
import express from 'express';
import helmet from 'helmet';

import { configureHelmet } from '../../../src/config/helmet';
import { MOCK_HELMET_VALUE } from '../../mock/data';

describe('Helmet Config test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should call helmet method and express app.use method', () => {
        const mockHelmet = helmet as unknown as jest.Mock;
        const mockApp = {
            use: jest.fn()
        } as unknown as express.Application;

        configureHelmet(mockApp);

        expect(mockHelmet).toHaveBeenCalledTimes(1);
        expect(mockHelmet).toHaveBeenCalledWith(MOCK_HELMET_VALUE);
        expect(mockApp.use).toHaveBeenCalled();
    });
});
