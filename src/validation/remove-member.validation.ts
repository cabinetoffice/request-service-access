import { body } from 'express-validator';

import { ErrorMessages } from './error.messages';
import { descriptionValidation } from './fields/description.validation';

export const removeMember = [
    body('github_handle').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.GIT_HANDLE),
    ...descriptionValidation
];
