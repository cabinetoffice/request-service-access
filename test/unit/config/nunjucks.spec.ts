jest.mock('nunjucks');
jest.mock('../../../src/utils/logger');

import { describe, expect, test, jest } from '@jest/globals';

import * as nunjucks from 'nunjucks';

import * as config from '../../../src/config';
import { log } from '../../../src/utils/logger';
import { configureNunjucks } from '../../../src/config/nunjucks';
import { MOCK_VIEWS_PATH } from '../../mock/text.mock';
import { MOCK_EXPRESS_APP } from '../../mock/data';

describe('Nunjucks Configuration test suites', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should configure Nunjucks with the correct parameters and global variables', () => {

        const mockNunjucksEnv = {
            addGlobal: jest.fn()
        };

        const nunjucksConfigureMock = nunjucks.configure as jest.Mock;

        nunjucksConfigureMock.mockReturnValue(mockNunjucksEnv);

        const mockLogInfo = log.info as jest.Mock;

        configureNunjucks(MOCK_EXPRESS_APP, MOCK_VIEWS_PATH);

        expect(nunjucks.configure).toHaveBeenCalledWith(
            [MOCK_VIEWS_PATH, 'node_modules/govuk-frontend', 'node_modules/govuk-frontend/components'],
            {
                autoescape: true,
                express: MOCK_EXPRESS_APP
            }
        );

        expect(mockNunjucksEnv.addGlobal).toHaveBeenCalledWith('CDN_HOST', config.CDN_HOST);
        expect(mockNunjucksEnv.addGlobal).toHaveBeenCalledWith('SERVICE_URL', config.SERVICE_URL);
        expect(mockNunjucksEnv.addGlobal).toHaveBeenCalledWith('SERVICE_NAME', config.SERVICE_NAME);

        expect(mockLogInfo).toHaveBeenCalledWith(expect.stringContaining(MOCK_VIEWS_PATH));
    });
});
