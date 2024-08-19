import { NextFunction, Request, Response } from 'express';
import {
    removeApplicationDataByID,
    getApplicationDataByID,
    setApplicationDataByID,
    setApplicationDataKey
} from '@co-digital/login';
import { v4 as uuidv4 } from 'uuid';

import * as config from '../config';
import { log } from '../utils/logger';

import { AdditionalRequests, AdditionalRequestsKey } from '../model/additional-requests.model';
import { getPreviousPageUrl } from '../utils/getPreviousPageUrl';

export const get = (_req: Request, res: Response) => {
    return res.render(config.ADDITIONAL_REQUESTS);
};

export const post = (req: Request, res: Response, next: NextFunction) => {
    try {
        const additionalRequestsID = uuidv4();
        const context = req.body.context;

        log.info(`Context: ${context}, Additional Requests ID: ${additionalRequestsID}`);

        setApplicationDataKey(req.session, { ...req.body, [config.ID]: additionalRequestsID }, AdditionalRequestsKey);

        return res.redirect(config.GITHUB_HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const getById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const additionalRequestsID = req.params[config.ID];
        const additionalRequestsData: AdditionalRequests = getApplicationDataByID(req.session, AdditionalRequestsKey, additionalRequestsID);

        log.info(`Context: ${additionalRequestsData.context}, Additional Requests ID: ${additionalRequestsID}`);

        return res.render(config.ADDITIONAL_REQUESTS, { ...additionalRequestsData, [config.ID]: additionalRequestsID });
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const postById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const context = req.body.context;
        const additionalRequestsID = req.params[config.ID];

        log.info(`Context: ${context}, Additional Requests ID: ${additionalRequestsID}`);

        setApplicationDataByID(req.session, { ...req.body, [config.ID]: additionalRequestsID }, AdditionalRequestsKey, additionalRequestsID);

        return res.redirect(getPreviousPageUrl(req));
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const removeById = (req: Request, res: Response, next: NextFunction) => {
    try {
        log.info(`Additional Requests ID: ${req.params.id}`);

        removeApplicationDataByID(req.session, AdditionalRequestsKey, req.params[config.ID]);

        return res.redirect(config.GITHUB_HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
