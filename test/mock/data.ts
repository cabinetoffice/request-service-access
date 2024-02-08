import * as config from '../../src/config';

export const GET_REQUEST_MOCK = { method: 'GET', path: '/test' };

export const MOCK_POST_ADD_REPO = { repo_name: 'repo1', visibility: 'public' };
export const MOCK_POST_ADD_MEMBER = { first_name: 'example', last_name: 'example', github_handle: 'example', email_address: 'email', description: 'description' };
export const MOCK_POST_ADD_TEAM = { team_name: 'team1', team_maintainer_github_handle: 'bob' };
export const MOCK_POST_REMOVE_MEMBER = { github_handle: 'example' };
export const MOCK_POST_TEAM_REQUEST = { team_name: 'team1' };
export const MOCK_POST_MEMBER_REQUEST = { github_handle: 'example' };

export const MOCK_POST_ADD_TEAM_MEMBER = { team_name: 'team1', team_member_github_handle: 'joe' };

export const MOCK_CORS_VALUE = {
    origin: [config.CDN_HOST, config.BASE_URL],
    credentials: true
};

export const MOCK_ERROR = {
    message: 'Error message'
} as Error;

export const MOCK_HELMET_VALUE = {
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            fontSrc: ["'self'"],
            styleSrc: ["'self'", config.CDN_HOST],
            scriptSrc: [
                "'self'",
                "'sha256-l1eTVSK8DTnK8+yloud7wZUqFrI0atVo6VlC6PJvYaQ='",
                "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='",
                config.CDN_HOST
            ],
            imgSrc: ["'self'", 'data:', config.CDN_HOST],
            connectSrc: ["'self'"],
            formAction: ["'self'"],
            objectSrc: ["'none'"]
        },
        reportOnly: false
    }
};
