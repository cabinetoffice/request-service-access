import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get, post } from '../controller/additional-requests.controller';
import * as config from '../config';

const additionalRequestsRouter = Router();

additionalRequestsRouter.get(config.ADDITIONAL_REQUESTS_URL, authentication, get);
additionalRequestsRouter.post(config.ADDITIONAL_REQUESTS_URL, authentication, post);

export default additionalRequestsRouter;
