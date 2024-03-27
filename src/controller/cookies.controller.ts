import { Request, Response } from 'express';
import * as config from '../config';

export const get = (_req: Request, res: Response) => {
    return res.render(config.COOKIES);
};
