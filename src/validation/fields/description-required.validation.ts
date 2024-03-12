import { body } from 'express-validator';

import { ErrorMessages } from '../error.messages';

export const descriptionRequiredValidation = [
    body('description')
        .not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.DESCRIPTION_REQUIRED)
        .isLength({ max: 1000 }).withMessage(ErrorMessages.DESCRIPTION_LENGTH)
];
