import { NextFunction, Request, Response } from 'express';
import { getSessionData, setSessionData } from '@co-digital/login';

import * as config from '../config';
import { log } from '../utils/logger';

import { AddTeamKey } from '../model/add-team.model';

export const get = (_req: Request, res: Response) => {
    return res.render(config.ADD_TEAM);
};

export const post = (req: Request, res: Response, next: NextFunction ) => {
    try {
        const teamName = req.body.team_name;
        const githubHandle = req.body.github_handle;

        log.info(`Team Name: ${teamName}, Team Maintainer GitHub Handle: ${githubHandle}`);

        setSessionData(req.session, {
            ...getSessionData(req.session),
            [AddTeamKey]: { ...req.body }
        });

        return res.redirect(config.HOME);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
