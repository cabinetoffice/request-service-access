import { PutItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { log } from '../../utils/logger';
import * as config from '../../config';
import { isFeatureEnabled } from '../../utils/isFeatureEnabled';

const client = new DynamoDBClient({
    region: config.REGION,
    endpoint: config.DYNAMO_ENDPOINT
});

export const putSubmission = async (id: string, appData: any) => {

    if (isFeatureEnabled(config.FEATURE_FLAG_ENABLE_DYNAMO)) {
        const params = { TableName: config.DYNAMO_TABLE_NAME,
            Item: marshall({ id: id, data: appData })
        };

        const command = new PutItemCommand(params);
        await client.send(command);

        log.info(`Submission ${id} successfully stored in ${config.DYNAMO_TABLE_NAME} table`);

    } else {
        log.info('DynamoDB is disabled');
    }

};
