export const PORT = process.env['PORT'] || '3000';
export const BASE_URL = process.env['BASE_URL'] || `http://localhost:${PORT}`;
export const CDN_HOST = process.env['CDN_HOST'] || 'd6nh3dxv55e16.cloudfront.net';
export const NODE_SSL_ENABLED = process.env['NODE_SSL_ENABLED'];

export const PATH_SSL_PRIVATE_KEY = process.env['PATH_SSL_PRIVATE_KEY'] || '';
export const PATH_SSL_CERTIFICATE = process.env['PATH_SSL_CERTIFICATE'] || '';

export const SERVICE_NAME = 'GitHub Requests Application ';

// Template
export const LANDING_PAGE = 'info';
export const NOT_FOUND = 'page-not-found';
export const ERROR_PAGE = 'error';

// Routing paths
export const LANDING_URL = '/info';

export const INFO_URL = '/info';
export const HEALTHCHECK_URL = '/healthcheck';
export const SERVICE_URL = `${BASE_URL}${LANDING_URL}`;
