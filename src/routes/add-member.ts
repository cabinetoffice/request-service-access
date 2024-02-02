import { Router } from 'express';
import { authentication } from '../middleware/authentication.middleware';
import { get, post } from '../controller/add-member.controller';
import * as config from '../config';

const addMemberRouter = Router();

addMemberRouter.get(config.ADD_MEMBER_URL, authentication, get);
addMemberRouter.post(config.ADD_MEMBER_URL, authentication, post);

export default addMemberRouter;
