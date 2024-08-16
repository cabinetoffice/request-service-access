import { NextFunction, Request, Response } from 'express';
import {
    getApplicationDataByID,
    removeApplicationDataByID,
    setApplicationDataByID,
    setApplicationDataKey
} from '@co-digital/login';
import { v4 as uuidv4 } from 'uuid';

import * as config from '../../config';
import { log } from '../../utils/logger';
import { getPreviousPageUrl } from '../../utils/getPreviousPageUrl';

import { Collaborator, CollaboratorKey } from '../../model/github/collaborator.model';

export const get = (_req: Request, res: Response) => {
    return res.render(config.COLLABORATOR);
};

export const post = (req: Request, res: Response, next: NextFunction ) => {
    try {
        const collaboratorID = uuidv4();
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const gitHubHandle = req.body.github_handle;
        const emailAddress = req.body.email_address;
        const repoName = req.body.repo_name;

        const msg = `First name: ${firstName}, Last name: ${lastName}, GitHub handle: ${gitHubHandle}`;
        log.info(`${msg}, email: ${emailAddress}, Repository Name: ${repoName}`);

        setApplicationDataKey(req.session, { ...req.body, [config.ID]: collaboratorID }, CollaboratorKey);

        return res.redirect(config.GITHUB_HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const getById = (req: Request, res: Response, next: NextFunction ) => {
    try {
        const collaboratorID = req.params[config.ID];
        const CollaboratorData: Collaborator = getApplicationDataByID(req.session, CollaboratorKey, collaboratorID);

        log.info(`GitHub handle: ${CollaboratorData.github_handle}, Collaborator ID: ${collaboratorID}`);

        return res.render(config.COLLABORATOR, { ...CollaboratorData, [config.ID]: collaboratorID });
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const postById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const collaboratorID = req.params[config.ID];
        const githubHandleName = req.body.github_handle;

        log.info(`GitHub handle: ${githubHandleName}, Collaborator ID: ${collaboratorID}`);

        setApplicationDataByID(req.session, { ...req.body, [config.ID]: collaboratorID }, CollaboratorKey, collaboratorID);

        return res.redirect(getPreviousPageUrl(req));
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const removeById = (req: Request, res: Response, next: NextFunction) => {
    try {
        log.info(`Collaborator ID: ${req.params.id}`);

        removeApplicationDataByID(req.session, CollaboratorKey, req.params[config.ID]);

        return res.redirect(config.GITHUB_HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

