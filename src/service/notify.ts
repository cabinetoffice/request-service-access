import { NotifyClient } from 'notifications-node-client';
import { log } from '../utils/logger';
import { isFeatureEnabled } from '../utils/isFeatureEnabled';

import * as config from '../config';

export const confirmationEmail = async (userEmail: string, reference_number: string): Promise<void> => {

    if (isFeatureEnabled(config.FEATURE_FLAG_ENABLE_NOTIFY)) {
        const notifyClient = new NotifyClient(config.NOTIFY_API_KEY);
        log.info(`Email confirmation is enabled. User: ${userEmail}`);
        await notifyClient.sendEmail(config.NOTIFY_EMAIL_TEMPLATE, userEmail, {
            personalisation: {
                'reference_number': reference_number,
                'team_email': config.NOTIFY_TEAM_EMAIL
            },
            reference: undefined,
        });
    } else {
        log.info('Email confirmation is disabled.');
    }
};

