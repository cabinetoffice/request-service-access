import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get, post } from '../controller/repo-request.controller';
import * as config from '../config';
import { repoRequest } from '../validation/repo-request.validation';
import { checkValidations } from '../middleware/validation.middleware';

const addRepoRouter = Router();

addRepoRouter.get(config.REPO_REQUEST_URL, authentication, get);
addRepoRouter.post(config.REPO_REQUEST_URL, authentication, ...repoRequest, checkValidations, post);

export default addRepoRouter;
