import { Router } from 'express';

import { get, post } from '../controller/github-service.controller';
import * as config from '../config';

const githubServiceRouter = Router();

githubServiceRouter.get(config.LANDING_URL, get);
githubServiceRouter.post(config.LANDING_URL, post);

export default githubServiceRouter;
