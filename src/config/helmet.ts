import express from 'express';
import helmet, { HelmetOptions } from 'helmet';

import * as config from '../config';

export const HELMET_OPTIONS: HelmetOptions = {
    referrerPolicy: {
        policy: 'strict-origin-when-cross-origin'
    },
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            fontSrc: ["'self'", config.CDN_HOST],
            styleSrc: [
                "'self'",
                "'unsafe-hashes'",
                "'sha256-6FWIojjtZwiNizws7ImlHjGH3DA5yMh5x4c+/4UVpXk='",
                config.CDN_HOST
            ],
            scriptSrc: [
                "'self'",
                "'sha256-pOe+O2hOZnTvxPXzgAfiocCoHgEZxBBgg+a66TylmHw='",
                "'sha256-GUQ5ad8JK5KmEWmROf3LZd9ge94daqNvd8xy9YS1iDw='",
                "'sha256-rDMP7u4Lf+tIufrYmUZIhcf2T3WBD4Pweu0EXe+qaLA='",
                "'sha256-wJphCpPdstup3Ojta3HnXJ3EOilATTTWg5oi4S9oi4s='",
                config.CDN_HOST
            ],
            imgSrc: ["'self'", 'data:', config.CDN_HOST],
            connectSrc: ["'self'"],
            formAction: ["'self'"],
            objectSrc: ["'none'"]
        },
        reportOnly: false
    }
};

export const configureHelmet = (app: express.Application) => {
    app.use(helmet(HELMET_OPTIONS));
};
