import { Router } from 'express';

import { get } from '../controller/cookies.controller';
import * as config from '../config';

import { authentication } from '../middleware/authentication.middleware';

const cookiesRouter = Router();

cookiesRouter.get(config.COOKIES_URL, authentication, get);

export default cookiesRouter;
