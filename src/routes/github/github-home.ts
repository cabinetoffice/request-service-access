import { Router } from 'express';

import { authentication } from '../../middleware/authentication.middleware';

import { get } from '../../controller/github/github-home.controller';
import * as config from '../../config';

const githubHomeRouter = Router();

githubHomeRouter.get(config.GITHUB_HOME_URL, authentication, get);

export default githubHomeRouter;
