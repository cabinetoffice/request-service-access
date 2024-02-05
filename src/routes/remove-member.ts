import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';
import { checkValidations } from '../middleware/validation.middleware';
import { removeMember } from '../validation/remove-member.validation';
import { get, post } from '../controller/remove-member.controller';

import * as config from '../config';

const removeMemberRouter = Router();

removeMemberRouter.get(config.REMOVE_MEMBER_URL, authentication, get);
removeMemberRouter.post(config.REMOVE_MEMBER_URL, authentication, ...removeMember, checkValidations, post);

export default removeMemberRouter;
