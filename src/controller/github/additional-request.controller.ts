import { NextFunction, Request, Response } from 'express';
import {
    removeApplicationDataByID,
    getApplicationDataByID,
    setApplicationDataByID,
    setApplicationDataKey
} from '@co-digital/login';
import { v4 as uuidv4 } from 'uuid';

import * as config from '../../config';
import { log } from '../../utils/logger';

import { AdditionalRequest, AdditionalRequestKey } from '../../model/github/additional-request.model';
import { getPreviousPageUrl } from '../../utils/getPreviousPageUrl';

export const get = (_req: Request, res: Response) => {
    return res.render(config.ADDITIONAL_REQUEST);
};

export const post = (req: Request, res: Response, next: NextFunction) => {
    try {
        const additionalRequestID = uuidv4();
        const context = req.body.context;

        log.info(`Context: ${context}, Additional Request ID: ${additionalRequestID}`);

        setApplicationDataKey(req.session, { ...req.body, [config.ID]: additionalRequestID }, AdditionalRequestKey);

        return res.redirect(config.GITHUB_HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const getById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const additionalRequestID = req.params[config.ID];
        const additionalRequestData: AdditionalRequest = getApplicationDataByID(req.session, AdditionalRequestKey, additionalRequestID);

        log.info(`Context: ${additionalRequestData.context}, Additional Request ID: ${additionalRequestID}`);

        return res.render(config.ADDITIONAL_REQUEST, { ...additionalRequestData, [config.ID]: additionalRequestID });
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const postById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const context = req.body.context;
        const additionalRequestID = req.params[config.ID];

        log.info(`Context: ${context}, Additional Request ID: ${additionalRequestID}`);

        setApplicationDataByID(req.session, { ...req.body, [config.ID]: additionalRequestID }, AdditionalRequestKey, additionalRequestID);

        return res.redirect(getPreviousPageUrl(req));
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const removeById = (req: Request, res: Response, next: NextFunction) => {
    try {
        log.info(`Additional Request ID: ${req.params.id}`);

        removeApplicationDataByID(req.session, AdditionalRequestKey, req.params[config.ID]);

        return res.redirect(config.GITHUB_HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
