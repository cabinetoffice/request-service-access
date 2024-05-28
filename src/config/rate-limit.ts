import { rateLimit } from 'express-rate-limit';
import express from 'express';
import { rateLimitHandler } from '../middleware/rateLimitHandler.middleware';

export const configureRateLimit = (app: express.Application) => {
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per window
        standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        handler: rateLimitHandler
    }));
};
