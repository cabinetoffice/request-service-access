import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get, post } from '../controller/member-request.controller';
import * as config from '../config';
import { memberRequest } from '../validation/member-request.validation';
import { checkValidations } from '../middleware/validation.middleware';

const memberRequestRouter = Router();

memberRequestRouter.get(config.MEMBER_REQUEST_URL, authentication, get);
memberRequestRouter.post(config.MEMBER_REQUEST_URL, authentication, ...memberRequest, checkValidations, post);

export default memberRequestRouter;
