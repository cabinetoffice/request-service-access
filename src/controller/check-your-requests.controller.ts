import { GitHubIssueRequest } from '@co-digital/api-sdk/lib/api-sdk/github/type';
import { NextFunction, Request, Response } from 'express';
import { getSessionData } from '@co-digital/login';
import { v4 as uuidv4 } from 'uuid';

import { client } from '../service/api';

import { log } from '../utils/logger';
import * as config from '../config';
import { ApplicationData } from '../model/application.model';
import { confirmationEmail } from '../service/notify';

export const get = (req: Request, res: Response, next: NextFunction) => {
    try {
        const appData: ApplicationData = getSessionData(req.session);

        return res.render(config.CHECK_YOUR_REQUESTS, {
            ...appData
        });
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = uuidv4();
        const url = `https://api.github.com/repos/${config.GITHUB_OWNER}/${config.GITHUB_TERRAFORM_REPO}/issues`;

        const appData = getSessionData(req.session);
        const body: GitHubIssueRequest = {
            assignees: [config.GITHUB_REPO_ISSUE_ASSIGNEE],
            labels: [config.GITHUB_REPO_ISSUE_ASSIGNEE],
            title: `Github Request App #${id}`,
            body: appData
        };

        log.info(`Submit Issue to ${url}, ID: #${id}`);

        await client.gitHub.postIssue(url, body);

        // TODO: Implement logic to gather the users email
        await confirmationEmail(config.NOTIFY_USER_EMAIL, id);

        return res.redirect(`${config.CONFIRMATION_URL}/${id}`);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
