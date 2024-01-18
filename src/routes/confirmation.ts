import { Router } from 'express';

import { get } from '../controller/confirmation.controller';
import * as config from '../config';

const confirmationRouter = Router();

confirmationRouter.get(config.CONFIRMATION_URL, get);

export default confirmationRouter;
