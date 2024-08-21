import { Router } from 'express';

import * as config from '../../config';

import { checkValidations } from '../../middleware/validation.middleware';
import { authentication } from '../../middleware/authentication.middleware';
import { collaborator } from '../../validation/github/collaborator.validation';
import { get, getById, post, postById, removeById } from '../../controller/github/collaborator.controller';

const collaboratorRouter = Router();

collaboratorRouter.get(config.GITHUB_URL + config.CREATE + config.COLLABORATOR_URL, authentication, get);
collaboratorRouter.post(config.GITHUB_URL + config.CREATE + config.COLLABORATOR_URL, authentication, ...collaborator, checkValidations, post);

collaboratorRouter.get(config.GITHUB_URL + config.REMOVE + config.COLLABORATOR_URL + config.PARAM_ID, authentication, removeById);

collaboratorRouter.get(config.GITHUB_URL + config.UPDATE + config.COLLABORATOR_URL + config.PARAM_ID, authentication, getById);
collaboratorRouter.post(config.GITHUB_URL + config.UPDATE + config.COLLABORATOR_URL + config.PARAM_ID, authentication, ...collaborator, checkValidations, postById);

export default collaboratorRouter;
