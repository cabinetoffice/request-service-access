import { rateLimit } from 'express-rate-limit';
import express from 'express';

export const configureRateLimit = (app: express.Application) => {
    app.use(rateLimit({
        windowMs: 5 * 60 * 1000, // 5 minutes
        limit: 10, // Limit each IP to 10 requests per window
        standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
        legacyHeaders: false // Disable the `X-RateLimit-*` headers.
    }));
};
