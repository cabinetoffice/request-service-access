import { Router } from 'express';

import { authentication } from '../../middleware/authentication.middleware';

import * as config from '../../config';
import { checkValidations } from '../../middleware/validation.middleware';
import { teamMember } from '../../validation/github/team-member.validation';
import { get, getById, post, postById, removeById } from '../../controller/github/team-member.controller';

const teamMemberRouter = Router();

teamMemberRouter.get(config.GITHUB_URL + config.CREATE + config.TEAM_MEMBER_URL, authentication, get);
teamMemberRouter.post(config.GITHUB_URL + config.CREATE + config.TEAM_MEMBER_URL, authentication, ...teamMember, checkValidations, post);

teamMemberRouter.get(config.GITHUB_URL + config.REMOVE + config.TEAM_MEMBER_URL + config.PARAM_ID, authentication, removeById);

teamMemberRouter.get(config.GITHUB_URL + config.UPDATE + config.TEAM_MEMBER_URL + config.PARAM_ID, authentication, getById);
teamMemberRouter.post(config.GITHUB_URL + config.UPDATE + config.TEAM_MEMBER_URL + config.PARAM_ID, authentication, ...teamMember, checkValidations, postById);

export default teamMemberRouter;
