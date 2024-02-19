import { Request, Response } from 'express';
import { log } from '../utils/logger';
import * as config from '../config';

export const get = (_req: Request, res: Response) => {
    return res.render(config.TEAM_REQUEST);
};

export const post = (req: Request, res: Response) => {

    const teamName = req.body.team_name;

    // validation middleware and data assignment to be implemented

    log.info(`Team Name: ${teamName}`);

    return res.redirect(config.HOME);
};
