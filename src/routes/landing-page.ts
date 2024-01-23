import { Router } from 'express';

import { get } from '../controller/landing-page.controller';
import * as config from '../config';

const landingPageRouter = Router();

landingPageRouter.get(config.LANDING_URL, get);

export default landingPageRouter;
