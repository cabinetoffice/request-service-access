import { getEnvironmentValue } from '../utils/getEnvironmentValue';

export const PORT = process.env['PORT'] || '3000';
export const BASE_URL = process.env['BASE_URL'] || `http://localhost:${PORT}`;
export const CDN_HOST = process.env['CDN_HOST'] || 'd6nh3dxv55e16.cloudfront.net';
export const NODE_SSL_ENABLED = process.env['NODE_SSL_ENABLED'];

export const PATH_SSL_PRIVATE_KEY = process.env['PATH_SSL_PRIVATE_KEY'] || '';
export const PATH_SSL_CERTIFICATE = process.env['PATH_SSL_CERTIFICATE'] || '';

export const SERVICE_NAME = 'GitHub Requests Application ';

// Template
export const LANDING = 'landing-page';
export const NOT_FOUND = 'page-not-found';
export const NOT_AVAILABLE = 'not-available';
export const ERROR_PAGE = 'error';
export const CONFIRMATION = 'confirmation';
export const REMOVE_MEMBER = 'remove-member';
export const ADD_TEAM = 'add-team';
export const TEAM_REQUEST = 'team-request';

// Routing paths

export const LANDING_URL = '/landing-page';
export const HEALTHCHECK_URL = '/healthcheck';
export const CONFIRMATION_URL = '/confirmation';
export const REMOVE_MEMBER_URL = '/remove-member';
export const ADD_TEAM_URL = '/add-team';
export const TEAM_REQUEST_URL = '/team-request';
export const SERVICE_URL = `${BASE_URL}${CONFIRMATION_URL}`;

// Feature Flags
export const FEATURE_FLAG_ENABLE_AUTH = getEnvironmentValue('FEATURE_FLAG_ENABLE_AUTH', 'false');

