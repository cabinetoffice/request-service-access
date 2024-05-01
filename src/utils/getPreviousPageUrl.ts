import { Request } from 'express';
import * as config from '../config';

export const getPreviousPageUrl = (req: Request): string => (config.PREVIOUS_PAGE_QUERY_PARAM in req.query) ? config.CHECK_YOUR_REQUESTS_URL : config.HOME_URL;
