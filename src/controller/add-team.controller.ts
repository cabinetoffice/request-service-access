import { Request, Response } from 'express';
import { log } from '../utils/logger';
import * as config from '../config';

export const get = (_req: Request, res: Response) => {
    return res.render(config.ADD_TEAM);
};

export const post = (req: Request, res: Response) => {

    const teamName = req.body.team_name;
    const teamMaintainerGithubHandle = req.body.team_maintainer_github_handle;

    // validation middleware and data assignment to be implemented

    log.info(`Team Name: ${teamName}, Team Maintainer GitHub Handle: ${teamMaintainerGithubHandle}`);

    return res.redirect(config.HOME);
};
