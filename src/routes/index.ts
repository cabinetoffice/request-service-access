import { Router } from 'express';

import { logger } from '../middleware/logger.middleware';

import startPageRouter from './start';
import githubHomeRouter from './github/github-home';
import healthcheckRouter from './healthcheck';
import confirmationRouter from './confirmation';
import repoRouter from './github/repo';
import memberRouter from './github/member';
import teamRouter from './github/team';
import teamMemberRouter from './github/team-member';
import collaboratorRouter from './github/collaborator';
import checkYourRequestsRouter from './check-your-requests';
import additionalRequestRouter from './github/additional-request';
import accessibilityStatementRouter from './accessibility-statement';
import cookiesRouter from './cookies';
import contactUsRouter from './contact-us';

const router = Router();

// Mounting Logging middleware on all routes
router.use(logger);

// Routes
router.use(startPageRouter);
router.use(githubHomeRouter);
router.use(memberRouter);
router.use(confirmationRouter);
router.use(healthcheckRouter);
router.use(repoRouter);
router.use(teamRouter);
router.use(teamMemberRouter);
router.use(collaboratorRouter);
router.use(checkYourRequestsRouter);
router.use(additionalRequestRouter);
router.use(accessibilityStatementRouter);
router.use(cookiesRouter);
router.use(contactUsRouter);

export default router;
