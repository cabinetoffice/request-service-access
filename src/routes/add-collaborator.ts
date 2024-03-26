import { Router } from 'express';

import * as config from '../config';

import { checkValidations } from '../middleware/validation.middleware';
import { authentication } from '../middleware/authentication.middleware';
import { addCollaborator as addCollaboratorValidation } from '../validation/add-collaborator.validation';
import { get, getById, post, postById, removeById } from '../controller/add-collaborator.controller';

const addCollaboratorRouter = Router();

addCollaboratorRouter.get(config.ADD_COLLABORATOR_URL, authentication, get);
addCollaboratorRouter.post(config.ADD_COLLABORATOR_URL, authentication, ...addCollaboratorValidation, checkValidations, post);
addCollaboratorRouter.get(config.ADD_COLLABORATOR_URL + config.PARAM_ID, authentication, getById);
addCollaboratorRouter.get(config.ADD_COLLABORATOR_URL + config.REMOVE + config.PARAM_ID, authentication, removeById);
addCollaboratorRouter.post(config.ADD_COLLABORATOR_URL + config.PARAM_ID, authentication, ...addCollaboratorValidation, checkValidations, postById);

export default addCollaboratorRouter;
