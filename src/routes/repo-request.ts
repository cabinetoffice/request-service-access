import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get, post } from '../controller/repo-request.controller';
import * as config from '../config';

const addRepoRouter = Router();

addRepoRouter.get(config.REPO_REQUEST_URL, authentication, get);
addRepoRouter.post(config.REPO_REQUEST_URL, authentication, post);

export default addRepoRouter;
