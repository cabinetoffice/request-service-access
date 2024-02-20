import express from 'express';
import cors from 'cors';

import * as config from '../config';

export const configureCors = (app: express.Application) => {
    app.use(cors({
        origin: [config.CDN_HOST, config.BASE_URL],
        credentials: true
    }));
};
