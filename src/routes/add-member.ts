import { Router } from 'express';

import * as config from '../config';

import { checkValidations } from '../middleware/validation.middleware';
import { authentication } from '../middleware/authentication.middleware';
import { addMember as addMemberValidation } from '../validation/add-member.validation';
import { get, getById, post, postById, removeById } from '../controller/add-member.controller';

const addMemberRouter = Router();

addMemberRouter.get(config.ADD_MEMBER_URL, authentication, get);
addMemberRouter.post(config.ADD_MEMBER_URL, authentication, ...addMemberValidation, checkValidations, post);
addMemberRouter.get(config.ADD_MEMBER_URL + config.PARAM_ID, authentication, getById);
addMemberRouter.get(config.ADD_MEMBER_URL + config.REMOVE + config.PARAM_ID, authentication, removeById);
addMemberRouter.post(config.ADD_MEMBER_URL + config.PARAM_ID, authentication, ...addMemberValidation, checkValidations, postById);

export default addMemberRouter;
