import { Router } from 'express';

import { logger } from '../middleware/logger.middleware';
import healthcheckRouter from './healthcheck';
import confirmationRouter from './confirmation';
import landingPageRouter from './landing-page';
import addMemberRouter from './add-member';

const router = Router();

router.use(logger);
router.use(healthcheckRouter);
router.use(confirmationRouter);
router.use(landingPageRouter);
router.use(addMemberRouter);

export default router;
