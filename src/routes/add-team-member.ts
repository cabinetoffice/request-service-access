import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get, post } from '../controller/add-team-member.controller';
import * as config from '../config';

const addTeamMemberRouter = Router();

addTeamMemberRouter.get(config.ADD_TEAM_MEMBER_URL, authentication, get);
addTeamMemberRouter.post(config.ADD_TEAM_MEMBER_URL, authentication, post);

export default addTeamMemberRouter;
