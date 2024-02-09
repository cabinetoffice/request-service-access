import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get, post } from '../controller/add-repo.controller';
import * as config from '../config';
import { addRepo } from '../validation/add-repo.validation';
import { checkValidations } from '../middleware/validation.middleware';

const addRepoRouter = Router();

addRepoRouter.get(config.ADD_REPO_URL, authentication, get);
addRepoRouter.post(config.ADD_REPO_URL, authentication, ...addRepo, checkValidations, post);

export default addRepoRouter;
