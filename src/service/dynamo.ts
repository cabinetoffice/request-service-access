import { PutItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

import * as config from '../config';

import { log } from '../utils/logger';
import { isFeatureEnabled } from '../utils/isFeatureEnabled';
import { getUserEmail } from '../utils/getUserEmail';

const client = new DynamoDBClient({
    region: config.REGION,
    endpoint: config.DYNAMO_ENDPOINT
});

export const putSubmission = async (id: string, jwt: string, appData: any) => {

    if (isFeatureEnabled(config.FEATURE_FLAG_ENABLE_DYNAMO)) {

        // TO-DO: add email retrieval to middleware and attach as property to res.locals
        const submissionEmailAddress = config.NODE_ENV === 'production' ? getUserEmail(jwt) : 'placeholder@fake.com';

        const params = {
            TableName: config.DYNAMO_TABLE_NAME,
            Item: marshall({
                id,
                data: {
                    ...appData,
                    submission_email_address: submissionEmailAddress
                }
            })
        };

        const command = new PutItemCommand(params);
        await client.send(command);

        log.info(`Submission ${id} successfully stored in ${config.DYNAMO_TABLE_NAME} table`);

    } else {
        log.info('Dynamo DB is disabled');
    }

};
