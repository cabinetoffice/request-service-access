import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import * as config from '../config';
import { checkValidations } from '../middleware/validation.middleware';
import { addTeamMember } from '../validation/add-team-member.validation';
import { get, getById, post, postById, removeById } from '../controller/add-team-member.controller';

const addTeamMemberRouter = Router();

addTeamMemberRouter.get(config.ADD_TEAM_MEMBER_URL, authentication, get);
addTeamMemberRouter.post(config.ADD_TEAM_MEMBER_URL, authentication, ...addTeamMember, checkValidations, post);
addTeamMemberRouter.get(config.ADD_TEAM_MEMBER_URL + config.PARAM_ID, authentication, getById);
addTeamMemberRouter.get(config.ADD_TEAM_MEMBER_URL + config.REMOVE + config.PARAM_ID, authentication, removeById);
addTeamMemberRouter.post(config.ADD_TEAM_MEMBER_URL + config.PARAM_ID, authentication, ...addTeamMember, checkValidations, postById);

export default addTeamMemberRouter;
