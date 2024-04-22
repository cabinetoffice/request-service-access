import { Request } from 'express';
import * as config from '../config';

export const getPreviousPageUrl = (req: Request): string => {

    const previousPage = req.query?.[config.PREVIOUS_PAGE_QUERY_PARAM];

    switch (previousPage) {
        case config.HOME_URL:
            return config.HOME_URL;
        case config.CHECK_YOUR_REQUESTS_URL:
            return config.CHECK_YOUR_REQUESTS_URL;
        default:
            return config.HOME_URL;
    }

};
