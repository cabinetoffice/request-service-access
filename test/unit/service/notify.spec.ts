jest.mock('../../../src/utils/isFeatureEnabled');
jest.mock('notifications-node-client');
jest.mock('../../../src/utils/logger', () => ({
    log: {
        info: jest.fn(),
        error: jest.fn()
    }
}));

import { describe, expect, jest, test, afterEach } from '@jest/globals';
import { confirmationEmail } from '../../../src/service/notify';
import { isFeatureEnabled } from '../../../src/utils/isFeatureEnabled';
import { NotifyClient } from 'notifications-node-client';
import { log } from '../../../src/utils/logger';
import * as config from '../../../src/config/';

const NotifyClientMock = NotifyClient as jest.Mock;
const isFeatureEnabledMock = isFeatureEnabled as jest.Mock;
const logInfoMock = log.info as jest.Mock;
const mockLogError = log.error as jest.Mock;

describe('Notify service unit test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should send an email when the feature flag is enabled', async () => {
        isFeatureEnabledMock.mockReturnValue(true);

        const mockEmailAddress = 'test@example.com';
        const mockReferenceNumber = '123456';

        await confirmationEmail(mockEmailAddress, mockReferenceNumber);

        expect(NotifyClientMock).toHaveBeenCalledWith(config.NOTIFY_API_KEY);

        expect(NotifyClientMock.prototype.sendEmail).toHaveBeenCalledWith(
            config.NOTIFY_EMAIL_TEMPLATE,
            mockEmailAddress,
            {
                personalisation: {
                    'reference_number': mockReferenceNumber,
                    'team_email': config.NOTIFY_TEAM_EMAIL
                },
                reference: undefined
            }
        );

        expect(logInfoMock).not.toHaveBeenCalledWith('Email confirmation is disabled.');
        expect(mockLogError).toHaveBeenCalledTimes(0);
    });

    test('should not send an email when the feature flag is disabled', async () => {
        isFeatureEnabledMock.mockReturnValue(false);

        const mockEmailAddress = 'test@example.com';
        const mockReferenceNumber = '123456';

        await confirmationEmail(mockEmailAddress, mockReferenceNumber);

        expect(NotifyClientMock.prototype.sendEmail).not.toHaveBeenCalled();
        expect(logInfoMock).toHaveBeenCalledWith('Email confirmation is disabled.');
        expect(mockLogError).toHaveBeenCalledTimes(0);
    });
    test('should log an error if sending the email fails', async () => {
        isFeatureEnabledMock.mockReturnValue(true);
        const mockError = ('Failed to send email');

        NotifyClientMock.prototype.sendEmail.mockRejectedValue(new Error(mockError));

        const mockEmailAddress = 'test@example.com';
        const mockReferenceNumber = '123456';

        await confirmationEmail(mockEmailAddress, mockReferenceNumber);

        expect(NotifyClientMock.prototype.sendEmail).toHaveBeenCalled();
        expect(log.error).toHaveBeenCalledWith(`Error: ${mockError}`);
    });
});

