import express from 'express';
import helmet from 'helmet';

import * as config from '../config';

export const configureHelmet = (app: express.Application) => {
    app.use(helmet({
        referrerPolicy: {
            policy: 'strict-origin-when-cross-origin'
        },
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                defaultSrc: ["'self'"],
                fontSrc: ["'self'", config.CDN_HOST],
                styleSrc: ["'self'", "'unsafe-hashes'", "'sha256-6FWIojjtZwiNizws7ImlHjGH3DA5yMh5x4c+/4UVpXk='", config.CDN_HOST],
                scriptSrc: [
                    "'self'",
                    "'sha256-l1eTVSK8DTnK8+yloud7wZUqFrI0atVo6VlC6PJvYaQ='",
                    "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='",
                    config.CDN_HOST
                ],
                imgSrc: ["'self'", 'data:', config.CDN_HOST],
                connectSrc: ["'self'"],
                formAction: ["'self'"],
                objectSrc: ["'none'"]
            },
            reportOnly: false
        }
    }));
};
