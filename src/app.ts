import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import router from './routes/index';
import { configureNunjucks } from './config/nunjucks';
import { configureHelmet } from './config/helmet';
import { configureCors } from './config/cors';

import { errorHandler, errorNotFound } from './controller/error.controller';

import { setNonce } from './middleware/nonce.middleware';

const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
