import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import * as config from '../config';
import { log } from '../utils/logger';

import { AddRepo, AddRepoKey } from '../model/add-repo.model';
import {
    getApplicationDataByID,
    removeApplicationDataByID,
    setApplicationDataByID,
    setApplicationDataKey
} from '@co-digital/login';

export const get = (_req: Request, res: Response) => {
    return res.render(config.ADD_REPO);
};

export const post = (req: Request, res: Response, next: NextFunction ) => {
    try {
        const repoID = uuidv4();
        const repoName = req.body.repo_name;
        const visibility = req.body.visibility;

        log.info(`Repository Name: ${repoName}, Visibility: ${visibility}`);

        setApplicationDataKey(req.session, { ...req.body, [config.ID]: repoID }, AddRepoKey);

        return res.redirect(config.HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const getById = (req: Request, res: Response, next: NextFunction ) => {
    try {
        const repoID = req.params[config.ID];
        const addRepoData: AddRepo = getApplicationDataByID(req.session, AddRepoKey, repoID);

        log.info(`Repo Name: ${addRepoData.repo_name}, Repo ID: ${repoID}`);

        return res.render(config.ADD_REPO, { ...addRepoData, [config.ID]: repoID });
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const postById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const repoName = req.body.repo_name;
        const repoID = req.params[config.ID];

        log.info(`Repo Name: ${repoName}, Repo ID: ${repoID}`);

        setApplicationDataByID(req.session, { ...req.body, [config.ID]: repoID }, AddRepoKey, repoID);

        return res.redirect(config.HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const removeById = (req: Request, res: Response, next: NextFunction) => {
    try {
        log.debug(`Repo ID: ${req.params.id}`);

        removeApplicationDataByID(req.session, AddRepoKey, req.params[config.ID]);

        return res.redirect(config.HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
