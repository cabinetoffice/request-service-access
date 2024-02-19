import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get } from '../controller/home.controller';
import * as config from '../config';

const homePageRouter = Router();

homePageRouter.get(config.HOME_URL, authentication, get);

export default homePageRouter;
