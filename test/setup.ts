export default () => {
    process.env.LOG_LEVEL = 'info';
    process.env.HUMAN = 'true';
    process.env.TEST_KEY = 'test';
    process.env.UNSANITISED_TEST_KEY = '   test      ';
};
