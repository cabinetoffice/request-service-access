import path from 'path';
import * as config from '../config';
import { Request } from 'express';

// https://codeql.github.com/codeql-query-help/javascript/js-path-injection/

export const validateFilepath = (reqPath: Request['path']): string => {

    // normalise req.path, then check the path starts with root url as per linked guidance
    const normalisedPath = path.resolve(config.ROOT_URL, reqPath);

    if (normalisedPath.startsWith(config.ROOT_URL)) {
        return normalisedPath;
    }

    throw new Error('Filepath validation failed');
};
