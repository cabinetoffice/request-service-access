import { Router } from 'express';

import { logger } from '../middleware/logger.middleware';
import healthcheckRouter from './healthcheck';
import confirmationRouter from './confirmation';
import landingPageRouter from './landing-page';

const router = Router();

router.use(logger);
router.use(healthcheckRouter);
router.use(confirmationRouter);
router.use(landingPageRouter);

export default router;
