import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get, post } from '../controller/check-your-requests.controller';
import * as config from '../config';

const checkYourRequestsRouter = Router();

checkYourRequestsRouter.get(config.CHECK_YOUR_REQUESTS_URL, authentication, get);
checkYourRequestsRouter.post(config.CHECK_YOUR_REQUESTS_URL, authentication, post);

export default checkYourRequestsRouter;
