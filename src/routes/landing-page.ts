import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get } from '../controller/landing-page.controller';
import * as config from '../config';

const landingPageRouter = Router();

landingPageRouter.get(config.LANDING_URL, authentication, get);

export default landingPageRouter;
