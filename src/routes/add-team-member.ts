import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get, post } from '../controller/add-team-member.controller';
import * as config from '../config';
import { checkValidations } from '../middleware/validation.middleware';
import { addTeamMember } from '../validation/add-team-member.validation';

const addTeamMemberRouter = Router();

addTeamMemberRouter.get(config.ADD_TEAM_MEMBER_URL, authentication, get);
addTeamMemberRouter.post(config.ADD_TEAM_MEMBER_URL, authentication, ...addTeamMember, checkValidations, post);

export default addTeamMemberRouter;
