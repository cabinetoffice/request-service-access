import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get, post } from '../controller/remove-member.controller';
import * as config from '../config';

const removeMemberRouter = Router();

removeMemberRouter.get(config.REMOVE_MEMBER_URL, authentication, get);
removeMemberRouter.post(config.REMOVE_MEMBER_URL, authentication, post);

export default removeMemberRouter;
