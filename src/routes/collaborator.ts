import { Router } from 'express';

import * as config from '../config';

import { checkValidations } from '../middleware/validation.middleware';
import { authentication } from '../middleware/authentication.middleware';
import { Collaborator } from '../validation/collaborator.validation';
import { get, getById, post, postById, removeById } from '../controller/collaborator.controller';

const CollaboratorRouter = Router();

CollaboratorRouter.get(config.GITHUB_URL + config.COLLABORATOR_URL, authentication, get);
CollaboratorRouter.get(config.GITHUB_URL + config.UPDATE + config.COLLABORATOR_URL + config.PARAM_ID, authentication, getById);

CollaboratorRouter.get(config.GITHUB_URL + config.REMOVE + config.COLLABORATOR_URL + config.PARAM_ID, authentication, removeById);

CollaboratorRouter.post(config.GITHUB_URL + config.COLLABORATOR_URL, authentication, ...Collaborator, checkValidations, post);
CollaboratorRouter.post(config.GITHUB_URL + config.UPDATE + config.COLLABORATOR_URL + config.PARAM_ID, authentication, ...Collaborator, checkValidations, postById);

export default CollaboratorRouter;
