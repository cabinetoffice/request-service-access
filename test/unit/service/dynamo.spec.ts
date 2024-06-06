jest.mock('../../../src/utils/isFeatureEnabled');
jest.mock('../../../src/utils/logger', () => ({
    log: {
        info: jest.fn()
    }
}));
jest.mock('../../../src/utils/getUserEmail');

const commandMock = jest.fn();
const dynamoDbClientSendMock = jest.fn();

jest.mock('@aws-sdk/client-dynamodb', () => ({
    PutItemCommand: jest.fn(() => commandMock),
    DynamoDBClient: jest.fn(() => ({ send: dynamoDbClientSendMock }))
}));
jest.mock('@aws-sdk/util-dynamodb', () => ({
    marshall: jest.fn()
}));

import { describe, expect, jest, test, afterEach } from '@jest/globals';

import { putSubmission } from '../../../src/service/dynamo';
import { isFeatureEnabled } from '../../../src/utils/isFeatureEnabled';
import { getUserEmail } from '../../../src/utils/getUserEmail';
import { log } from '../../../src/utils/logger';
import { marshall } from '@aws-sdk/util-dynamodb';

import * as config from '../../../src/config';
import { MOCK_APP_DATA, MOCK_SUBMISSION_ID, MOCK_SUBMISSION_EMAIL_ADDRESS, MOCK_DYNAMODB_RECORD } from '../../mock/data';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const isFeatureEnabledMock = isFeatureEnabled as jest.Mock;
const marshallMock = marshall as jest.Mock;
const getUserEmailMock = getUserEmail as jest.Mock;
const dynamoDbClientMock = DynamoDBClient as jest.Mock;
const logInfoMock = log.info as jest.Mock;
const putItemCommandMock = PutItemCommand as unknown as jest.Mock;

describe('Dynamo submission service unit test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('it should call Dynamo DB methods, marshall util and getUserEmail with correct params if feature flag is enabled', async () => {

        const mockJwt = 'mocked-jwt-token';

        isFeatureEnabledMock.mockReturnValueOnce(true);
        marshallMock.mockReturnValueOnce(MOCK_DYNAMODB_RECORD);
        getUserEmailMock.mockReturnValue(MOCK_SUBMISSION_EMAIL_ADDRESS);

        await putSubmission(MOCK_SUBMISSION_ID, mockJwt, MOCK_APP_DATA);

        expect(dynamoDbClientMock).toHaveBeenCalledWith({
            region: config.REGION,
            endpoint: config.DYNAMO_ENDPOINT
        });
        expect(isFeatureEnabledMock).toHaveBeenCalledWith(config.FEATURE_FLAG_ENABLE_DYNAMO);

        expect(marshallMock).toHaveBeenCalledTimes(1);
        expect(marshallMock).toHaveBeenCalledWith({ id: MOCK_SUBMISSION_ID, data: { ...MOCK_APP_DATA, submission_email_address: MOCK_SUBMISSION_EMAIL_ADDRESS } });

        expect(getUserEmailMock).toHaveBeenCalledTimes(1);
        expect(getUserEmailMock).toHaveBeenCalledWith(mockJwt);

        expect(putItemCommandMock).toHaveBeenCalledTimes(1);
        expect(putItemCommandMock).toHaveBeenCalledWith({ TableName: config.DYNAMO_TABLE_NAME, Item: MOCK_DYNAMODB_RECORD });

        expect(dynamoDbClientSendMock).toHaveBeenCalledTimes(1);
        expect(dynamoDbClientSendMock).toHaveBeenCalledWith(commandMock);

        expect(logInfoMock).toHaveBeenCalledTimes(1);
        expect(logInfoMock).toHaveBeenCalledWith(`Submission ${MOCK_SUBMISSION_ID} successfully stored in ${config.DYNAMO_TABLE_NAME} table`);
    });

    test('it should not call marshall util, getUserEmail or Dynamo DB methods if feature flag is disabled', async () => {

        isFeatureEnabledMock.mockReturnValueOnce(false);
        const mockJwt = 'mocked-jwt-token';

        await putSubmission(MOCK_SUBMISSION_ID, mockJwt, MOCK_APP_DATA);

        expect(isFeatureEnabledMock).toHaveBeenCalledWith(config.FEATURE_FLAG_ENABLE_DYNAMO);

        expect(marshallMock).not.toHaveBeenCalled();
        expect(getUserEmailMock).not.toHaveBeenCalled();
        expect(putItemCommandMock).not.toHaveBeenCalled();
        expect(dynamoDbClientSendMock).not.toHaveBeenCalled();

        expect(logInfoMock).toHaveBeenCalledTimes(1);
        expect(logInfoMock).toHaveBeenCalledWith('Dynamo DB is disabled');

    });
});

