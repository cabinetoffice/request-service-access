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

import { TeamMember, TeamMemberKey } from '../../model/github/team-member.model';
import { getPreviousPageUrl } from '../../utils/getPreviousPageUrl';

export const get = (_req: Request, res: Response) => {
    return res.render(config.TEAM_MEMBER);
};

export const post = (req: Request, res: Response, next: NextFunction ) => {
    try {
        const teamMembersID = uuidv4();
        const teamName = req.body.team_name;
        const githubHandles = req.body.github_handles;

        log.info(`Team name: ${teamName}, GitHub handle(s): ${githubHandles}`);

        setApplicationDataKey(req.session, { ...req.body, [config.ID]: teamMembersID }, TeamMemberKey);

        return res.redirect(config.GITHUB_HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const getById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const teamMembersID = req.params[config.ID];
        const TeamMemberData: TeamMember = getApplicationDataByID(req.session, TeamMemberKey, teamMembersID);
        log.info(`Team name: ${TeamMemberData.team_name}, GitHub handle(s): ${TeamMemberData.github_handles}, Team member ID: ${teamMembersID}`);

        return res.render(config.TEAM_MEMBER, { ...TeamMemberData, [config.ID]: teamMembersID });
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const postById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const teamName = req.body.team_name;
        const githubHandles = req.body.github_handles;
        const teamMembersID = req.params[config.ID];

        log.info(`Team name: ${teamName}, GitHub handle(s): ${githubHandles}, Team member ID: ${teamMembersID}`);

        setApplicationDataByID(req.session, { ...req.body, [config.ID]: teamMembersID }, TeamMemberKey, teamMembersID);

        return res.redirect(getPreviousPageUrl(req));
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const removeById = (req: Request, res: Response, next: NextFunction) => {
    try {
        log.info(`Team member ID: ${req.params.id}`);

        removeApplicationDataByID(req.session, TeamMemberKey, req.params[config.ID]);

        return res.redirect(config.GITHUB_HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
