import { NextFunction, Request, Response } from 'express';
import {
    getApplicationDataByID,
    removeApplicationDataByID,
    setApplicationDataByID,
    setApplicationDataKey
} from '@co-digital/login';
import { v4 as uuidv4 } from 'uuid';

import * as config from '../config';
import { log } from '../utils/logger';
import { getPreviousPageUrl } from '../utils/getPreviousPageUrl';

import { AddMember, AddMemberKey } from '../model/add-member.model';

export const get = (_req: Request, res: Response) => {
    return res.render(config.ADD_MEMBER);
};

export const post = (req: Request, res: Response, next: NextFunction ) => {
    try {
        const memberID = uuidv4();
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const gitHubHandle = req.body.github_handle;
        const emailAddress = req.body.email_address;
        const contractType = req.body.contract_type;
        const contractEndDate = req.body.contract_end_date;

        const msg = `First name: ${firstName}, Last name: ${lastName}, GitHub handle: ${gitHubHandle}`;
        log.info(`${msg}, email: ${emailAddress}, Contract end date: ${contractEndDate}`);

        setApplicationDataKey(
            req.session,
            postSessionBody(req.body, memberID, contractType, contractEndDate),
            AddMemberKey
        );

        return res.redirect(config.HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const getById = (req: Request, res: Response, next: NextFunction ) => {
    try {
        const memberID = req.params[config.ID];
        const addMemberData: AddMember = getApplicationDataByID(req.session, AddMemberKey, memberID);

        log.info(`GitHub handle: ${addMemberData.github_handle}, Member ID: ${memberID}`);

        return res.render(config.ADD_MEMBER, { ...addMemberData, [config.ID]: memberID });
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const postById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const memberID = req.params[config.ID];
        const contractType = req.body.contract_type;
        const githubHandleName = req.body.github_handle;
        const contractEndDate = req.body.contract_end_date;

        log.info(`GitHub handle: ${githubHandleName}, Member ID: ${memberID}`);

        setApplicationDataByID(
            req.session,
            postSessionBody(req.body, memberID, contractType, contractEndDate),
            AddMemberKey, memberID
        );

        const previousPageUrl = getPreviousPageUrl(req);

        return res.redirect(previousPageUrl);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

export const removeById = (req: Request, res: Response, next: NextFunction) => {
    try {
        log.info(`Member ID: ${req.params.id}`);

        removeApplicationDataByID(req.session, AddMemberKey, req.params[config.ID]);

        return res.redirect(config.HOME_URL);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};

const postSessionBody = (body: any, id: string, contractType: string, contractEndDate: string) => {
    return {
        ...body,
        [config.ID]: id,
        contract_end_date: (contractType === `permanent`) ? '' : contractEndDate
    };
};
