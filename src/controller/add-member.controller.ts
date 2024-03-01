import { NextFunction, Request, Response } from 'express';
import { getSessionData, setSessionData } from '@co-digital/login';

import * as config from '../config';
import { log } from '../utils/logger';

import { AddMemberKey } from '../model/add-member.model';

export const get = (_req: Request, res: Response) => {
    return res.render(config.ADD_MEMBER);
};

export const post = (req: Request, res: Response, next: NextFunction ) => {
    try {
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const gitHubHandle = req.body.github_handle;
        const emailAddress = req.body.email_address;
        const contractType = req.body.contract_type;
        const contractEndDate = req.body.contract_end_date;

        const msg = `First name: ${firstName}, Last name: ${lastName}, GitHub handle: ${gitHubHandle}`;
        log.info(`${msg}, email: ${emailAddress}, Contract end date: ${contractEndDate}`);

        setSessionData(req.session, {
            ...getSessionData(req.session),
            [AddMemberKey]: {
                ...req.body,
                contract_end_date: (contractType === `permanent`) ? '' : contractEndDate
            }
        });

        return res.redirect(config.HOME);
    } catch (err: any) {
        log.errorRequest(req, err.message);
        next(err);
    }
};
