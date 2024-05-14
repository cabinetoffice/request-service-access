import { NotifyClient } from 'notifications-node-client';
import { log } from '../utils/logger';
import { isFeatureEnabled } from '../utils/isFeatureEnabled';
import * as config from '../config';

export const confirmationEmail = async (emailAddress: string, reference_number: string): Promise<void> => {
    try {
        if (isFeatureEnabled(config.FEATURE_FLAG_NOTIFY)) {
            const notifyClient = new NotifyClient(config.NOTIFY_API_KEY);
            log.info('Email confirmation is enabled.');
            await notifyClient.sendEmail(config.NOTIFY_EMAIL_TEMPLATE, emailAddress, {
                personalisation: {
                    'reference_number': reference_number,
                    'team_email': config.NOTIFY_TEAM_EMAIL
                },
                reference: undefined,
            });
        } else {
            log.info('Email confirmation is disabled.');
        }
    } catch (err: any){
        log.error(`Error: ${err.message}`);
    }
};
