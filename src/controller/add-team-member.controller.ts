import { NextFunction, Request, Response } from 'express';
import {
    removeApplicationDataByID,
    getApplicationDataByID,
    setApplicationDataByID,
    setApplicationDataKey
} from '@co-digital/login';
import { v4 as uuidv4 } from 'uuid';

import * as config from '../config';
import { log } from '../utils/logger';

import { AddTeamMember, AddTeamMemberKey } from '../model/add-team-member.model';

export const get = (_req: Request, res: Response) => {
    return res.render(config.ADD_TEAM_MEMBER);
};

export const post = (req: Request, res: Response, next: NextFunction ) => {
    try {
        const teamMembersID = uuidv4();
        const teamName = req.body.team_name;
        const githubHandles = req.body.github_handles;

        log.info(`Team name: ${teamName}, GitHub handle(s): ${githubHandles}`);

        setApplicationDataKey(req.session, { ...req.body, [config.ID]: teamMembersID }, AddTeamMemberKey);

        return res.redirect(config.HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const getById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const teamMembersID = req.params[config.ID];
        const addTeamMemberData: AddTeamMember = getApplicationDataByID(req.session, AddTeamMemberKey, teamMembersID);

        log.info(`Team name: ${addTeamMemberData.team_name}, GitHub handle(s): ${addTeamMemberData.github_handles}, Team member ID: ${teamMembersID}`);

        return res.render(config.ADD_TEAM_MEMBER, { ...addTeamMemberData, [config.ID]: teamMembersID });
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

        setApplicationDataByID(req.session, { ...req.body, [config.ID]: teamMembersID }, AddTeamMemberKey, teamMembersID);

        return res.redirect(config.HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const removeById = (req: Request, res: Response, next: NextFunction) => {
    try {
        log.info(`Team member ID: ${req.params.id}`);

        removeApplicationDataByID(req.session, AddTeamMemberKey, req.params[config.ID]);

        return res.redirect(config.HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
