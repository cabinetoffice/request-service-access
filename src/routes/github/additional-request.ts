import { Router } from 'express';

import { checkValidations } from '../../middleware/validation.middleware';
import { authentication } from '../../middleware/authentication.middleware';
import { additionalRequest as additionalRequestValidation } from '../../validation/github/additional-request.validation';

import { get, post, getById, removeById, postById } from '../../controller/github/additional-request.controller';
import * as config from '../../config';

const additionalRequestRouter = Router();

additionalRequestRouter.get(config.GITHUB_URL + config.CREATE + config.ADDITIONAL_REQUEST_URL, authentication, get);
additionalRequestRouter.post(config.GITHUB_URL + config.CREATE + config.ADDITIONAL_REQUEST_URL, authentication, ...additionalRequestValidation, checkValidations, post);

additionalRequestRouter.get(config.GITHUB_URL + config.REMOVE + config.ADDITIONAL_REQUEST_URL + config.PARAM_ID, authentication, removeById);

additionalRequestRouter.get(config.GITHUB_URL + config.UPDATE + config.ADDITIONAL_REQUEST_URL + config.PARAM_ID, authentication, getById);
additionalRequestRouter.post(config.GITHUB_URL + config.UPDATE + config.ADDITIONAL_REQUEST_URL + config.PARAM_ID, authentication, ...additionalRequestValidation, checkValidations, postById);

export default additionalRequestRouter;
