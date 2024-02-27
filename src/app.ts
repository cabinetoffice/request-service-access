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

import { setNonce } from './middleware/nonce.middleware';

const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(COOKIE_PARSER_SECRET));
app.use(cookieSession({ secret: COOKIE_SESSION_SECRET }));

app.use(setNonce);
configureHelmet(app);
configureCors(app);

const viewPath = path.join(__dirname, 'views');
configureNunjucks(app, viewPath);

app.set('views', viewPath);
app.set('view engine', 'html');

app.use('/', router);

app.use(errorNotFound);
app.use(errorHandler);

export default app;
