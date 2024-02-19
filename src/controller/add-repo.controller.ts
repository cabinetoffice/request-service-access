import { Request, Response } from 'express';
import { log } from '../utils/logger';
import * as config from '../config';

export const get = (_req: Request, res: Response) => {
    return res.render(config.ADD_REPO);
};

export const post = (req: Request, res: Response) => {

    const repoName = req.body.repo_name;
    const visibility = req.body.visibility;

    // validation middleware and data assignment to be implemented

    log.info(`Repository Name: ${repoName}, Visibility: ${visibility}`);

    return res.redirect(config.HOME);
};
