import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get, post } from '../controller/team-request.controller';
import * as config from '../config';

const teamRequestRouter = Router();

teamRequestRouter.get(config.TEAM_REQUEST_URL, authentication, get);
teamRequestRouter.post(config.TEAM_REQUEST_URL, authentication, post);

export default teamRequestRouter;
