import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get, post } from '../controller/add-team.controller';
import * as config from '../config';
import { addTeam } from '../validation/add-team.validation';
import { checkValidations } from '../middleware/validation.middleware';

const addTeamRouter = Router();

addTeamRouter.get(config.ADD_TEAM_URL, authentication, get);
addTeamRouter.post(config.ADD_TEAM_URL, authentication, ...addTeam, checkValidations, post);

export default addTeamRouter;
