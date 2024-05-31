import { NotifyClient } from 'notifications-node-client';
import { log } from '../utils/logger';
import { isFeatureEnabled } from '../utils/isFeatureEnabled';
import { getUserEmail } from '../utils/getUserEmail';

import * as config from '../config';

export const confirmationEmail = async (jwt: string, reference_number: string): Promise<void> => {

    if (isFeatureEnabled(config.FEATURE_FLAG_ENABLE_NOTIFY)) {
        const notifyClient = new NotifyClient(config.NOTIFY_API_KEY);
        const userEmail = getUserEmail(jwt);
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
