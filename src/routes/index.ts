import { Router } from 'express';

import { logger } from '../middleware/logger.middleware';
import healthcheckRouter from './healthcheck';
import confirmationRouter from './confirmation';

const router = Router();

router.use(logger);
router.use(healthcheckRouter);
router.use(confirmationRouter);

export default router;
