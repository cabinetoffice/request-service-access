import { Request, Response } from 'express';
import * as config from '../config';

export const get = (req: Request, res: Response) => {
    const id = req.params[config.ID];
    return res.render(config.CONFIRMATION, { id });
};
