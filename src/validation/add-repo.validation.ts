import { body } from 'express-validator';

import { ErrorMessages } from './error.messages';
import { descriptionValidation } from './fields/description.validation';

export const addRepo = [
    body('repo_name').notEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.REPO_NAME),
    body('visibility').notEmpty().withMessage(ErrorMessages.VISIBILITY),
    ...descriptionValidation
];
