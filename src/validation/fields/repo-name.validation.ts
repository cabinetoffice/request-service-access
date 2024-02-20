import { body } from 'express-validator';

import { ErrorMessages } from '../error.messages';

export const repoNameValidation = [
    body('repo_name').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.REPO_NAME),
];
