import { Request, Response } from 'express';
import { log } from '../utils/logger';
import * as config from '../config';

export const get = (_req: Request, res: Response) => {
    return res.render(config.ADD_TEAM_MEMBER);
};

export const post = (req: Request, res: Response) => {

    const teamName = req.body.team_name;
    const githubHandle = req.body.github_handle;

    // validation middleware and data assignment to be implemented

    log.info(`Team Name: ${teamName}, Team Member GitHub Handle: ${githubHandle}`);

    return res.redirect(config.HOME);
};
