import { Router } from 'express';

import * as config from '../../config';

import { checkValidations } from '../../middleware/validation.middleware';
import { authentication } from '../../middleware/authentication.middleware';
import { repo as repoValidation } from '../../validation/github/repo.validation';
import { get, getById, post, postById, removeById } from '../../controller/github/repo.controller';

const repoRouter = Router();

repoRouter.get(config.GITHUB_URL + config.CREATE + config.REPO_URL, authentication, get);
repoRouter.post(config.GITHUB_URL + config.CREATE + config.REPO_URL, authentication, ...repoValidation, checkValidations, post);

repoRouter.get(config.GITHUB_URL + config.REMOVE + config.REPO_URL + config.PARAM_ID, authentication, removeById);

repoRouter.get(config.GITHUB_URL + config.UPDATE + config.REPO_URL + config.PARAM_ID, authentication, getById);
repoRouter.post(config.GITHUB_URL + config.UPDATE + config.REPO_URL + config.PARAM_ID, authentication, ...repoValidation, checkValidations, postById);

export default repoRouter;
