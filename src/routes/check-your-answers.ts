import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';

import { get, post } from '../controller/check-your-answers.controller';
import * as config from '../config';

const checkYourAnswersRouter = Router();

checkYourAnswersRouter.get(config.CHECK_YOUR_ANSWERS_URL, authentication, get);
checkYourAnswersRouter.post(config.CHECK_YOUR_ANSWERS_URL, authentication, post);

export default checkYourAnswersRouter;
