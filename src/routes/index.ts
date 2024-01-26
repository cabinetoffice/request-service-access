import { Router } from 'express';

import { logger } from '../middleware/logger.middleware';
import healthcheckRouter from './healthcheck';
import confirmationRouter from './confirmation';
import landingPageRouter from './landing-page';
import removeMemberRouter from './remove-member';

const router = Router();

router.use(logger);
router.use(landingPageRouter);
router.use(healthcheckRouter);
router.use(confirmationRouter);
router.use(removeMemberRouter);

export default router;
