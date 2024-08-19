import { Router } from 'express';

import * as config from '../../config';

import { checkValidations } from '../../middleware/validation.middleware';
import { authentication } from '../../middleware/authentication.middleware';
import { team as teamValidation } from '../../validation/github/team.validation';
import { get, getById, post, removeById, postById } from '../../controller/github/team.controller';

const teamRouter = Router();

teamRouter.get(config.GITHUB_URL + config.CREATE + config.TEAM_URL, authentication, get);
teamRouter.post(config.GITHUB_URL + config.CREATE + config.TEAM_URL, authentication, ...teamValidation, checkValidations, post);

teamRouter.get(config.GITHUB_URL + config.REMOVE + config.TEAM_URL + config.PARAM_ID, authentication, removeById);

teamRouter.get(config.GITHUB_URL + config.UPDATE + config.TEAM_URL + config.PARAM_ID, authentication, getById);
teamRouter.post(config.GITHUB_URL + config.UPDATE + config.TEAM_URL + config.PARAM_ID, authentication, ...teamValidation, checkValidations, postById);

export default teamRouter;
