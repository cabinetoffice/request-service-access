import { Request, Response } from 'express';
import { log } from '../utils/logger';
import * as config from '../config';

export const get = (_req: Request, res: Response) => {
    return res.render(config.ADD_MEMBER);
};

export const post = (req: Request, res: Response) => {

    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const gitHubHandle = req.body.github_handle;
    const emailAddress = req.body.email_address;
    const contractType = req.body.contract_type;

    // validation middleware and data assignment to be implemented

    log.info(`first_name: ${firstName}, last_name: ${lastName}, github_handle: ${gitHubHandle}, email_address: ${emailAddress}, contract_type: ${contractType}`);

    return res.redirect(config.LANDING);
};
