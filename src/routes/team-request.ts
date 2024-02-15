import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';
import { checkValidations } from '../middleware/validation.middleware';
import { teamRequest } from '../validation/team-request.validation';
import { get, post } from '../controller/team-request.controller';
import * as config from '../config';

const teamRequestRouter = Router();

teamRequestRouter.get(config.TEAM_REQUEST_URL, authentication, get);
teamRequestRouter.post(config.TEAM_REQUEST_URL, authentication, ...teamRequest, checkValidations, post);

export default teamRequestRouter;
