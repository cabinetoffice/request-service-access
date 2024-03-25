import { Router } from 'express';

import { logger } from '../middleware/logger.middleware';

import startPageRouter from './start';
import homePageRouter from './home';
import healthcheckRouter from './healthcheck';
import confirmationRouter from './confirmation';
import addRepoRouter from './add-repo';
import addMemberRouter from './add-member';
import addTeamRouter from './add-team';
import addTeamMemberRouter from './add-team-member';
import addCollaboratorRouter from './add-collaborator';
import checkYourAnswersRouter from './check-your-answers';
import additionalRequestsRouter from './additional-requests.controller';

const router = Router();

// Mounting Logging middleware on all routes
router.use(logger);

// Routes
router.use(startPageRouter);
router.use(homePageRouter);
router.use(addMemberRouter);
router.use(confirmationRouter);
router.use(healthcheckRouter);
router.use(addRepoRouter);
router.use(addTeamRouter);
router.use(addTeamMemberRouter);
router.use(addCollaboratorRouter);
router.use(checkYourAnswersRouter);
router.use(additionalRequestsRouter);

export default router;
