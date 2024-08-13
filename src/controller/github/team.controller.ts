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

import { Team, TeamKey } from '../../model/github/team.model';
import { getPreviousPageUrl } from '../../utils/getPreviousPageUrl';

export const get = (_req: Request, res: Response) => {
    return res.render(config.TEAM);
};

export const post = (req: Request, res: Response, next: NextFunction) => {
    try {
        const teamID = uuidv4();
        const teamName = req.body.team_name;
        const githubHandle = req.body.github_handle;

        log.info(`Team Name: ${teamName}, Team Maintainer GitHub Handle: ${githubHandle}, Team ID: ${teamID}`);

        setApplicationDataKey(req.session, { ...req.body, [config.ID]: teamID }, TeamKey);

        return res.redirect(config.HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const getById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const teamID = req.params[config.ID];
        const teamData: Team = getApplicationDataByID(req.session, TeamKey, teamID);

        log.info(`Team Name: ${teamData.team_name}, Team ID: ${teamID}`);

        return res.render(config.TEAM, { ...teamData, [config.ID]: teamID });
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const postById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const teamName = req.body.team_name;
        const teamID = req.params[config.ID];

        log.info(`Team Name: ${teamName}, Team ID: ${teamID}`);

        setApplicationDataByID(req.session, { ...req.body, [config.ID]: teamID }, TeamKey, teamID);

        return res.redirect(getPreviousPageUrl(req));
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const removeById = (req: Request, res: Response, next: NextFunction) => {
    try {
        log.info(`Team ID: ${req.params.id}`);

        removeApplicationDataByID(req.session, TeamKey, req.params[config.ID]);

        return res.redirect(config.HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
