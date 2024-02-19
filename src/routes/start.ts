import { Router } from 'express';

import { get } from '../controller/start.controller';
import * as config from '../config';

const startPageRouter = Router();

startPageRouter.get(config.START_URL, get);

export default startPageRouter;
