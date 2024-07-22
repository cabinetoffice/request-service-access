import express from 'express';
import * as nunjucks from 'nunjucks';

import { log } from '../utils/logger';
import * as config from '../config';

export const configureNunjucks = (app: express.Application, viewsPath: string) => {
    log.info(`Set nunjucks configurations and where nunjucks templates should resolve to: ${viewsPath}`);

    const nunjucksEnv = nunjucks.configure(
        [viewsPath, 'node_modules/govuk-frontend/dist', 'node_modules/govuk-frontend/dist/components'],
        {
            autoescape: true,
            express: app
        }
    );
    nunjucksEnv.addGlobal('PARAMS', {
        previousPage: config.PREVIOUS_PAGE_QUERY_PARAM
    });
    nunjucksEnv.addGlobal('ROUTES', {
        HOME: config.HOME_URL,
        CHECK_YOUR_REQUESTS_URL: config.CHECK_YOUR_REQUESTS_URL
    });
    nunjucksEnv.addGlobal('AUTH_URLS', {
        AUTH_SIGN_IN_URL: config.AUTH_SIGN_IN_URL,
        AUTH_SIGN_OUT_URL: config.AUTH_SIGN_OUT_URL
    });
    nunjucksEnv.addGlobal('CDN_HOST', config.CDN_HOST);
    nunjucksEnv.addGlobal('SERVICE_URL', config.SERVICE_URL);
    nunjucksEnv.addGlobal('SERVICE_NAME', config.SERVICE_NAME);
    nunjucksEnv.addGlobal('DEPARTMENT_NAME', config.DEPARTMENT_NAME);
    nunjucksEnv.addGlobal('GITHUB_ORG_NAME', config.GITHUB_ORG_NAME);
    nunjucksEnv.addGlobal('FEATURE_FLAG_ENABLE_COOKIE_BANNER', config.FEATURE_FLAG_ENABLE_COOKIE_BANNER);

};
