import { Router } from 'express';

import { logger } from '../middleware/logger.middleware';

import startPageRouter from './start';
import homePageRouter from './home';
import healthcheckRouter from './healthcheck';
import confirmationRouter from './confirmation';
import repoRouter from './github/repo';
import memberRouter from './github/member';
import addTeamRouter from './add-team';
import addTeamMemberRouter from './add-team-member';
import CollaboratorRouter from './github/collaborator';
import checkYourRequestsRouter from './check-your-requests';
import additionalRequestsRouter from './additional-requests';
import accessibilityStatementRouter from './accessibility-statement';
import cookiesRouter from './cookies';
import contactUsRouter from './contact-us';

const router = Router();

// Mounting Logging middleware on all routes
router.use(logger);

// Routes
router.use(startPageRouter);
router.use(homePageRouter);
router.use(memberRouter);
router.use(confirmationRouter);
router.use(healthcheckRouter);
router.use(repoRouter);
router.use(addTeamRouter);
router.use(addTeamMemberRouter);
router.use(CollaboratorRouter);
router.use(checkYourRequestsRouter);
router.use(additionalRequestsRouter);
router.use(accessibilityStatementRouter);
router.use(cookiesRouter);
router.use(contactUsRouter);

export default router;
