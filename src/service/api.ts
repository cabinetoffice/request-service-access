import { createOAuthApiClient } from '@co-digital/api-sdk';
import { GITHUB_KEY } from '../config/index';

const createApiClient = () => {
    return createOAuthApiClient(GITHUB_KEY);
};

export const client = createApiClient();
