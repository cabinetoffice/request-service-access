import { body } from 'express-validator';

import { ErrorMessages } from '../error.messages';
import { descriptionValidation } from '../fields/description.validation';
import { repoNameValidation } from '../fields/repo-name.validation';

export const repo = [
    ...repoNameValidation,
    body('visibility').notEmpty().withMessage(ErrorMessages.VISIBILITY),
    ...descriptionValidation
];
