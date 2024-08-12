import express from 'express';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import path from 'path';

import router from './routes/index';

import {
    COOKIE_PARSER_SECRET,
    COOKIE_SESSION_SECRET
} from './config';
import { configureNunjucks } from './config/nunjucks';
import { configureHelmet } from './config/helmet';
import { configureCors } from './config/cors';

import { errorHandler, errorNotFound } from './controller/error.controller';

import { configureRateLimit } from './config/rate-limit';

const app = express();

app.disable('x-powered-by');

const govukPath = path.join(__dirname, '../node_modules/govuk-frontend/dist/govuk');

app.use('/assets', express.static(`${govukPath}/assets`));
app.use('/govuk-frontend.min.css', express.static(`${govukPath}/govuk-frontend.min.css`));
app.use('/govuk-frontend.min.js', express.static(`${govukPath}/govuk-frontend.min.js`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(COOKIE_PARSER_SECRET));
app.use(cookieSession({ secret: COOKIE_SESSION_SECRET }));

configureHelmet(app);
configureCors(app);
configureRateLimit(app);

const viewPath = path.join(__dirname, 'views');
configureNunjucks(app, viewPath);

app.set('views', viewPath);
app.set('view engine', 'html');

app.use('/', router);

app.use(errorNotFound);
app.use(errorHandler);

export default app;
