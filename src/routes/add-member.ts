import { Router } from 'express';

import { get } from '../controller/add-member.controller';
import * as config from '../config';

const addMemberRouter = Router();

addMemberRouter.get(config.ADD_MEMBER_URL, get);

export default addMemberRouter;
