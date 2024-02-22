import { body } from 'express-validator';

import { ErrorMessages } from '../error.messages';

export const descriptionValidationNoOptional = [
    body('description').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.DESCRIPTION)
        .isLength({ max: 1000 }).withMessage(ErrorMessages.DESCRIPTION_LENGTH)
];
