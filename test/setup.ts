export default () => {
    process.env.LOG_LEVEL = 'info';
    process.env.HUMAN = 'true';
    process.env.TEST_KEY = 'test';
    process.env.CDN_HOST = 'test';
    process.env.COOKIE_PARSER_SECRET = 'secret';
    process.env.COOKIE_SESSION_SECRET = 'secret';
    process.env.UNSANITISED_TEST_KEY = '   test      ';
};
