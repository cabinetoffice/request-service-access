import { Router } from 'express';

import { authentication } from '../../middleware/authentication.middleware';

import * as config from '../../config';
import { checkValidations } from '../../middleware/validation.middleware';
import { teamMemberValidation } from '../../validation/team-member.validation';
import { get, getById, post, postById, removeById } from '../../controller/github/team-member.controller';

const teamMemberRouter = Router();

teamMemberRouter.get(config.GITHUB_URL + config.CREATE + config.TEAM_MEMBER_URL, authentication, get);
teamMemberRouter.post(config.GITHUB_URL + config.CREATE + config.TEAM_MEMBER_URL, authentication, ...teamMemberValidation, checkValidations, post);

teamMemberRouter.get(config.GITHUB_URL + config.REMOVE + config.TEAM_MEMBER_URL + config.PARAM_ID, authentication, removeById);

teamMemberRouter.get(config.GITHUB_URL + config.UPDATE + config.TEAM_MEMBER_URL + config.PARAM_ID, authentication, getById);
teamMemberRouter.post(config.GITHUB_URL + config.UPDATE + config.TEAM_MEMBER_URL + config.PARAM_ID, authentication, ...teamMemberValidation, checkValidations, postById);

export default teamMemberRouter;
