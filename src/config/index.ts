import { getEnvironmentValue } from '../utils/getEnvironmentValue';

export const SERVICE_NAME = 'GitHub Requests Application ';

export const PATH_SSL_PRIVATE_KEY = getEnvironmentValue('PATH_SSL_PRIVATE_KEY', 'false');
export const PATH_SSL_CERTIFICATE = getEnvironmentValue('PATH_SSL_CERTIFICATE', 'false');

export const PORT = getEnvironmentValue('PORT', '3000');
export const BASE_URL = getEnvironmentValue('BASE_URL', `http://localhost:${PORT}`);
export const NODE_SSL_ENABLED = getEnvironmentValue('NODE_SSL_ENABLED', 'false');

export const CDN_HOST = getEnvironmentValue('CDN_HOST');

export const COOKIE_PARSER_SECRET = getEnvironmentValue('COOKIE_PARSER_SECRET');
export const COOKIE_SESSION_SECRET = getEnvironmentValue('COOKIE_SESSION_SECRET');

// Template
export const START = 'start';
export const HOME = 'home';
export const ADD_MEMBER = 'add-member';
export const REMOVE_MEMBER = 'remove-member';
export const MEMBER_REQUST = 'member-request';
export const NOT_FOUND = 'page-not-found';
export const NOT_AVAILABLE = 'not-available';
export const ERROR_PAGE = 'error';
export const CONFIRMATION = 'confirmation';
export const ADD_TEAM = 'add-team';
export const TEAM_REQUEST = 'team-request';
export const ADD_TEAM_MEMBER = 'add-team-member';
export const ADD_REPO = 'add-repo';
export const REPO_REQUEST = 'repo-request';

// Routing paths

export const START_URL = '/start';
export const HOME_URL = '/home';
export const ADD_MEMBER_URL = '/add-member';
export const REMOVE_MEMBER_URL = '/remove-member';
export const MEMBER_REQUEST_URL = '/member-request';
export const HEALTHCHECK_URL = '/healthcheck';
export const CONFIRMATION_URL = '/confirmation';
export const ADD_TEAM_URL = '/add-team';
export const TEAM_REQUEST_URL = '/team-request';
export const ADD_TEAM_MEMBER_URL = '/add-team-member';
export const ADD_REPO_URL = '/add-repo';
export const REPO_REQUEST_URL = '/repo-request';

export const SERVICE_URL = `${BASE_URL}${CONFIRMATION_URL}`;

// Feature Flags
export const FEATURE_FLAG_ENABLE_AUTH = getEnvironmentValue('FEATURE_FLAG_ENABLE_AUTH', 'false');
