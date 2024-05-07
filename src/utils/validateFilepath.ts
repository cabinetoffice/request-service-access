import path from 'path';
import * as config from '../config';
import { Request, Response } from 'express';

// https://codeql.github.com/codeql-query-help/javascript/js-path-injection/

export const validateFilepath = (req: Request, res: Response): string | void => {

    // normalise req.path, then check the path starts with root url as per linked guidance
    const normalisedPath = path.resolve(config.ROOT_URL, req.path);

    if (!(normalisedPath.startsWith(config.ROOT_URL))) {
        return res.render(config.ERROR_PAGE);
    }

    return normalisedPath;
};
