import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get, post } from '../controller/add-team.controller';
import * as config from '../config';

const addTeamRouter = Router();

addTeamRouter.get(config.ADD_TEAM_URL, authentication, get);
addTeamRouter.post(config.ADD_TEAM_URL, authentication, post);

export default addTeamRouter;
