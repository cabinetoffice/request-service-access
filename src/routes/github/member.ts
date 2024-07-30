import { Router } from 'express';

import * as config from '../../config';

import { checkValidations } from '../../middleware/validation.middleware';
import { authentication } from '../../middleware/authentication.middleware';
import { member as memberValidation } from '../../validation/github/member.validation';
import { get, getById, post, postById, removeById } from '../../controller/github/member.controller';

const memberRouter = Router();

memberRouter.get(config.GITHUB_URL + config.CREATE + config.MEMBER_URL, authentication, get);
memberRouter.post(config.GITHUB_URL + config.CREATE + config.MEMBER_URL, authentication, ...memberValidation, checkValidations, post);

memberRouter.get(config.GITHUB_URL + config.REMOVE + config.MEMBER_URL + config.PARAM_ID, authentication, removeById);

memberRouter.get(config.GITHUB_URL + config.UPDATE + config.MEMBER_URL + config.PARAM_ID, authentication, getById);
memberRouter.post(config.GITHUB_URL + config.UPDATE + config.MEMBER_URL + config.PARAM_ID, authentication, ...memberValidation, checkValidations, postById);

export default memberRouter;
