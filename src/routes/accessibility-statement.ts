import { Router } from 'express';

import { get } from '../controller/accessibilty-statement-controller';
import * as config from '../config';

import { authentication } from '../middleware/authentication.middleware';

const accessibilityStatementRouter = Router();

accessibilityStatementRouter.get(config.ACCESSIBILITY_STATEMENT_URL, authentication, get);

export default accessibilityStatementRouter;
