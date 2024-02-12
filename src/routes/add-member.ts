import { Router } from 'express';
import { authentication } from '../middleware/authentication.middleware';
import { checkValidations } from '../middleware/validation.middleware';
import { addMember } from '../validation/add-member.validation';
import { get, post } from '../controller/add-member.controller';
import * as config from '../config';

const addMemberRouter = Router();

addMemberRouter.get(config.ADD_MEMBER_URL, authentication, get);
addMemberRouter.post(config.ADD_MEMBER_URL, authentication, ...addMember, checkValidations, post);

export default addMemberRouter;
