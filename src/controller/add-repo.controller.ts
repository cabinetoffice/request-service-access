import { NextFunction, Request, Response } from 'express';
import { getSessionData, setSessionData } from '@co-digital/login';

import * as config from '../config';
import { log } from '../utils/logger';

import { AddRepoKey } from '../model/add-repo.model';

export const get = (_req: Request, res: Response) => {
    return res.render(config.ADD_REPO);
};

export const post = (req: Request, res: Response, next: NextFunction ) => {
    try {
        const repoName = req.body.repo_name;
        const visibility = req.body.visibility;

        log.info(`Repository Name: ${repoName}, Visibility: ${visibility}`);

        setSessionData(req.session, {
            ...getSessionData(req.session),
            [AddRepoKey]: { ...req.body }
        });

        return res.redirect(config.HOME);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
