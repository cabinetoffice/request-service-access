import { Router } from 'express';

import { logger } from '../middleware/logger.middleware';
import healthcheckRouter from './healthcheck';
import githubServiceRouter from './github-service';

const router = Router();

router.use(logger);
router.use(healthcheckRouter);
router.use(githubServiceRouter);

export default router;
