import { jest, expect } from '@jest/globals';

import * as config from '../../src/config';
import express from 'express';
import { AddMemberKey } from '../../src/model/add-member.model';

export const MOCK_POST_ISSUE_URL = `https://api.github.com/repos/secret/test/issues`;

export const GET_REQUEST_MOCK = { method: 'GET', path: '/test' };

export const MOCK_POST_ADD_REPO = { repo_name: 'repo1', visibility: 'public' };
export const MOCK_POST_ADD_MEMBER = {
    first_name: 'example',
    last_name: 'example',
    github_handle: 'example',
    email_address: 'email@hotmail.com',
    description: 'description',
    contract_type: 'permanent',
    contract_end_date: ''
};
export const MOCK_POST_ADD_COLLABORATOR = {
    first_name: 'example',
    last_name: 'example',
    github_handle: 'example',
    email_address: 'email@hotmail.com',
    repo_name: 'repo1'
};
export const MOCK_APP_DATA = {
    [AddMemberKey]: MOCK_POST_ADD_MEMBER
};

export const MOCK_JWT_NAME = 'mock-jwt-name';

export const MOCK_JWT = 'ey32fakejwt3957t7u2';

export const MOCK_SUBMISSION_ID = '123456789';

export const MOCK_EMAIL = 'test@example.com';

export const MOCK_DYNAMODB_RECORD = {
    'id': {
        'S': MOCK_SUBMISSION_ID
    },
    'data': {
        'M': {
            [AddMemberKey]: {
                'L': [
                    {
                        'M': {
                            'first_name': {
                                'S': MOCK_POST_ADD_MEMBER.first_name
                            },
                            'last_name': {
                                'S': MOCK_POST_ADD_MEMBER.last_name
                            },
                            'github_handle': {
                                'S': MOCK_POST_ADD_MEMBER.github_handle
                            },
                            'id': {
                                'S': 'a36c9b7f-fe99-4d4c-b2c7-9056f4091527'
                            },
                            'email_address': {
                                'S': MOCK_POST_ADD_MEMBER.email_address
                            },
                            'description': {
                                'S': MOCK_POST_ADD_MEMBER.description
                            },
                            'contract_type': {
                                'S': MOCK_POST_ADD_MEMBER.contract_type
                            },
                            'contract_end_date': {
                                'S': MOCK_POST_ADD_MEMBER.contract_end_date
                            },
                        }
                    }
                ]
            }
        },
        submission_email_address: { S: MOCK_EMAIL }
    }
};

export const MOCK_POST_ADD_TEAM = { team_name: 'team1', github_handle: 'bob' };
export const MOCK_POST_ADDITIONAL_REQUESTS = { context: 'member', description: 'description' };
export const MOCK_POST_REMOVE_MEMBER = { github_handle: 'example' };
export const MOCK_POST_TEAM_REQUEST = { team_name: 'team1' };
export const MOCK_POST_MEMBER_REQUEST = { github_handle: 'example' };

export const MOCK_POST_ADD_TEAM_MEMBER = { team_name: 'team1', github_handles: 'joe' };
export const MOCK_POST_REPO_REQUEST = { repo_name: 'repo1' };

export const MOCK_CORS_VALUE = {
    origin: [config.CDN_HOST, config.BASE_URL],
    credentials: true
};

export const MOCK_ERROR = {
    message: 'Error message'
} as Error;

export const MOCK_HELMET_VALUE = {
    referrerPolicy: {
        policy: 'strict-origin-when-cross-origin'
    },
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            fontSrc: ["'self'", config.CDN_HOST],
            styleSrc: ["'self'", config.CDN_HOST],
            scriptSrc: [
                "'self'",
                // Hash of the inline scripts respectively for:
                // `<script> document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');</script>`
                "'sha256-l1eTVSK8DTnK8+yloud7wZUqFrI0atVo6VlC6PJvYaQ='",
                // `<script>window.GOVUKFrontend.initAll()</script>`
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

export const MOCK_RATE_LIMIT_VALUE = {
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: expect.any(Function)
};

export const MOCK_EXPRESS_APP = {
    use: jest.fn()
} as unknown as express.Application;
