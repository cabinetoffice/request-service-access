import { body } from 'express-validator';

import { ErrorMessages } from './error.messages';
import { descriptionValidation } from './fields/description.validation';

export const repoRequest = [
    body('repo_name').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.REPO_NAME),
    ...descriptionValidation
];
