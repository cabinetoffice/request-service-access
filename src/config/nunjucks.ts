import express from 'express';
import * as nunjucks from 'nunjucks';

import { log } from '../utils/logger';
import * as config from '../config';

export const configureNunjucks = (app: express.Application, viewsPath: string) => {
    log.info(`Set nunjucks configurations and where nunjucks templates should resolve to: ${viewsPath}`);

    const nunjucksEnv = nunjucks.configure(
        [viewsPath, 'node_modules/govuk-frontend', 'node_modules/govuk-frontend/components'],
        {
            autoescape: true,
            express: app
        }
    );

    nunjucksEnv.addGlobal('CDN_HOST', config.CDN_HOST);
    nunjucksEnv.addGlobal('SERVICE_URL', config.SERVICE_URL);
    nunjucksEnv.addGlobal('SERVICE_NAME', config.SERVICE_NAME);
    nunjucksEnv.addGlobal('ORG_NAME', config.ORG_NAME);
};
