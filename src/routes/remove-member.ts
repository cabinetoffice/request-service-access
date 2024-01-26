import { Router } from 'express';

import { get, post } from '../controller/remove-member.controller';
import * as config from '../config';

const removeMemberRouter = Router();

removeMemberRouter.get(config.REMOVE_MEMBER_URL, get);
removeMemberRouter.post(config.REMOVE_MEMBER_URL, post);

export default removeMemberRouter;
