import { Router } from 'express';

import { checkValidations } from '../middleware/validation.middleware';
import { authentication } from '../middleware/authentication.middleware';
import { additionalRequests as additionalRequestsValidation } from '../validation/additional-requests.validation';

import { get, post, getById, removeById, postById } from '../controller/additional-requests.controller';
import * as config from '../config';

const additionalRequestsRouter = Router();

additionalRequestsRouter.get(config.ADDITIONAL_REQUESTS_URL, authentication, get);
additionalRequestsRouter.post(config.ADDITIONAL_REQUESTS_URL, authentication, ...additionalRequestsValidation, checkValidations, post);
additionalRequestsRouter.get(config.ADDITIONAL_REQUESTS_URL + config.PARAM_ID, authentication, getById);
additionalRequestsRouter.get(config.ADDITIONAL_REQUESTS_URL + config.REMOVE + config.PARAM_ID, authentication, removeById);
additionalRequestsRouter.post(config.ADDITIONAL_REQUESTS_URL + config.PARAM_ID, authentication, ...additionalRequestsValidation, checkValidations, postById);

export default additionalRequestsRouter;
