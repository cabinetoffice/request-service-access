import { Router } from 'express';

import { get } from '../controller/confirmation.controller';
import * as config from '../config';

import { authentication } from '../middleware/authentication.middleware';

const confirmationRouter = Router();

confirmationRouter.get(config.CONFIRMATION_URL + config.PARAM_ID, authentication, get);

export default confirmationRouter;
