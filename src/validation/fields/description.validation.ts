import { body } from 'express-validator';

import { ErrorMessages } from '../error.messages';

export const descriptionValidation = [
    body('description').isLength({ max: 1000 }).withMessage(ErrorMessages.DESCRIPTION_LENGTH),
    body('description').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.DESCRIPTION),
];
