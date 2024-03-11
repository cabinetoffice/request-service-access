import { Router } from 'express';

import * as config from '../config';

import { checkValidations } from '../middleware/validation.middleware';
import { authentication } from '../middleware/authentication.middleware';
import { addTeam as addTeamValidation } from '../validation/add-team.validation';
import { get, getById, post, removeById, postById } from '../controller/add-team.controller';

const addTeamRouter = Router();

addTeamRouter.get(config.ADD_TEAM_URL, authentication, get);
addTeamRouter.post(config.ADD_TEAM_URL, authentication, ...addTeamValidation, checkValidations, post);
addTeamRouter.get(config.ADD_TEAM_URL + config.PARAM_ID, authentication, getById);
addTeamRouter.get(config.ADD_TEAM_URL + config.REMOVE + config.PARAM_ID, authentication, removeById);
addTeamRouter.post(config.ADD_TEAM_URL + config.PARAM_ID, authentication, ...addTeamValidation, checkValidations, postById);

export default addTeamRouter;
