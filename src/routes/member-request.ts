import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get, post } from '../controller/member-request.controller';
import * as config from '../config';

const memberRequestRouter = Router();

memberRequestRouter.get(config.MEMBER_REQUST_URL, authentication, get);
memberRequestRouter.post(config.MEMBER_REQUST_URL, authentication, post);

export default memberRequestRouter;
