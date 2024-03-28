import { Router } from 'express';

import { get } from '../controller/contact-us.controller';
import * as config from '../config';

import { authentication } from '../middleware/authentication.middleware';

const contactUsRouter = Router();

contactUsRouter.get(config.CONTACT_US_URL, authentication, get);

export default contactUsRouter;
