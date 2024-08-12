import { getEnvironmentValue } from '../utils/getEnvironmentValue';

export const SERVICE_NAME = 'GitHub Requests';

export const AUTH_SIGN_IN_URL = getEnvironmentValue('AUTH_SIGN_IN_URL');
export const AUTH_SIGN_OUT_URL = getEnvironmentValue('AUTH_SIGN_OUT_URL');

export const DEPARTMENT_NAME = getEnvironmentValue('DEPARTMENT_NAME');
export const GITHUB_ORG_NAME = getEnvironmentValue('GITHUB_ORG_NAME');

export const PATH_SSL_PRIVATE_KEY = getEnvironmentValue('PATH_SSL_PRIVATE_KEY', 'false');
export const PATH_SSL_CERTIFICATE = getEnvironmentValue('PATH_SSL_CERTIFICATE', 'false');

export const PORT = getEnvironmentValue('PORT', '3000');
export const BASE_URL = getEnvironmentValue('BASE_URL', `http://localhost:${PORT}`);
export const NODE_SSL_ENABLED = getEnvironmentValue('NODE_SSL_ENABLED', 'false');
export const NODE_ENV = getEnvironmentValue('NODE_ENV');

export const CDN_HOST = getEnvironmentValue('CDN_HOST');

export const COOKIE_ID_NAME = getEnvironmentValue('COOKIE_ID_NAME');
export const COOKIE_PARSER_SECRET = getEnvironmentValue('COOKIE_PARSER_SECRET');
export const COOKIE_SESSION_SECRET = getEnvironmentValue('COOKIE_SESSION_SECRET');
export const SESSION_APP_KEY = getEnvironmentValue('SESSION_APP_KEY');

export const GITHUB_KEY = getEnvironmentValue('GITHUB_KEY');
export const GITHUB_OWNER = getEnvironmentValue('GITHUB_OWNER');
export const GITHUB_TERRAFORM_REPO = getEnvironmentValue('GITHUB_TERRAFORM_REPO');
export const GITHUB_REPO_ISSUE_ASSIGNEE = getEnvironmentValue('GITHUB_REPO_ISSUE_ASSIGNEE');
export const GITHUB_REPO_ISSUE_LABEL = getEnvironmentValue('GITHUB_REPO_ISSUE_LABEL');

export const NOTIFY_API_KEY = getEnvironmentValue('NOTIFY_API_KEY');
export const NOTIFY_EMAIL_TEMPLATE = getEnvironmentValue('NOTIFY_EMAIL_TEMPLATE');
export const NOTIFY_USER_EMAIL = getEnvironmentValue('NOTIFY_USER_EMAIL');
export const NOTIFY_TEAM_EMAIL = getEnvironmentValue('NOTIFY_TEAM_EMAIL');

export const REGION = getEnvironmentValue('REGION');
export const DYNAMO_ENDPOINT = getEnvironmentValue('DYNAMO_ENDPOINT');
export const DYNAMO_TABLE_NAME = getEnvironmentValue('DYNAMO_TABLE_NAME');

// Template
export const START = 'start';
export const HOME = 'home';
export const MEMBER = 'member';
export const NOT_FOUND = 'page-not-found';
export const NOT_AVAILABLE = 'not-available';
export const ERROR_PAGE = 'error';
export const CONFIRMATION = 'confirmation';
export const ADD_TEAM = 'add-team';
export const ADD_TEAM_MEMBER = 'add-team-member';
export const REPO = 'repo';
export const COLLABORATOR = 'collaborator';
export const CHECK_YOUR_REQUESTS = 'check-your-requests';
export const ADDITIONAL_REQUESTS = 'additional-requests';
export const ACCESSIBILITY_STATEMENT = 'accessibility-statement';
export const COOKIES = 'cookies';
export const CONTACT_US = 'contact-us';

// Routing paths
export const ROOT_URL = '/';
export const START_URL = '/start';
export const HOME_URL = '/home';
export const MEMBER_URL = '/member';
export const HEALTHCHECK_URL = '/healthcheck';
export const CONFIRMATION_URL = '/confirmation';
export const ADD_TEAM_URL = '/add-team';
export const ADD_TEAM_MEMBER_URL = '/add-team-member';
export const REPO_URL = '/repo';
export const COLLABORATOR_URL = '/collaborator';
export const CHECK_YOUR_REQUESTS_URL = '/check-your-requests';
export const ADDITIONAL_REQUESTS_URL = '/additional-requests';
export const ACCESSIBILITY_STATEMENT_URL = '/accessibility-statement';
export const COOKIES_URL = '/cookies';
export const CONTACT_US_URL = '/contact-us';

export const SERVICE_URL = `${BASE_URL}${HOME_URL}`;

// Query Params

export const PREVIOUS_PAGE_QUERY_PARAM = 'previousPage';

// Feature Flags
export const FEATURE_FLAG_ENABLE_COOKIE_BANNER = getEnvironmentValue('FEATURE_FLAG_ENABLE_COOKIE_BANNER');
export const FEATURE_FLAG_ENABLE_AUTH = getEnvironmentValue('FEATURE_FLAG_ENABLE_AUTH', 'false');
export const FEATURE_FLAG_ENABLE_NOTIFY = getEnvironmentValue('FEATURE_FLAG_ENABLE_NOTIFY', 'false');
export const FEATURE_FLAG_ENABLE_DYNAMO = getEnvironmentValue('FEATURE_FLAG_ENABLE_DYNAMO', 'false');

// MISC
export const CREATE = '/create';
export const REMOVE = '/remove';
export const UPDATE = '/update';
export const GITHUB_URL = '/github';
export const ID = 'id';
export const PARAM_ID = `/:${ID}`;
