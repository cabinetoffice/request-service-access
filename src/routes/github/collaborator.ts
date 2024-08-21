import { Router } from 'express';

import * as config from '../../config';

import { checkValidations } from '../../middleware/validation.middleware';
import { authentication } from '../../middleware/authentication.middleware';
import { collaborator } from '../../validation/github/collaborator.validation';
import { get, getById, post, postById, removeById } from '../../controller/github/collaborator.controller';

const CollaboratorRouter = Router();

CollaboratorRouter.get(config.GITHUB_URL + config.CREATE + config.COLLABORATOR_URL, authentication, get);
CollaboratorRouter.post(config.GITHUB_URL + config.CREATE + config.COLLABORATOR_URL, authentication, ...collaborator, checkValidations, post);

CollaboratorRouter.get(config.GITHUB_URL + config.REMOVE + config.COLLABORATOR_URL + config.PARAM_ID, authentication, removeById);

CollaboratorRouter.get(config.GITHUB_URL + config.UPDATE + config.COLLABORATOR_URL + config.PARAM_ID, authentication, getById);
CollaboratorRouter.post(config.GITHUB_URL + config.UPDATE + config.COLLABORATOR_URL + config.PARAM_ID, authentication, ...collaborator, checkValidations, postById);

export default CollaboratorRouter;
