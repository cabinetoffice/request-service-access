import { Router } from 'express';

import * as config from '../config';

import { checkValidations } from '../middleware/validation.middleware';
import { authentication } from '../middleware/authentication.middleware';
import { addRepo as addRepoValidation } from '../validation/add-repo.validation';
import { get, getById, post, postById, removeById } from '../controller/add-repo.controller';

const addRepoRouter = Router();

addRepoRouter.get(config.ADD_REPO_URL, authentication, get);
addRepoRouter.post(config.ADD_REPO_URL, authentication, ...addRepoValidation, checkValidations, post);
addRepoRouter.get(config.ADD_REPO_URL + config.PARAM_ID, authentication, getById);
addRepoRouter.get(config.ADD_REPO_URL + config.REMOVE + config.PARAM_ID, authentication, removeById);
addRepoRouter.post(config.ADD_REPO_URL + config.PARAM_ID, authentication, ...addRepoValidation, checkValidations, postById);

export default addRepoRouter;
