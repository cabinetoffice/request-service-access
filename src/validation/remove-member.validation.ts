import { body } from 'express-validator';

import { ErrorMessages } from './error.messages';

export const removeMember = [
    body('github_handle').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.GIT_HANDLE),
    body('description').isLength({ max: 1000 }).withMessage(ErrorMessages.DESCRIPTION_LENGTH)
];
