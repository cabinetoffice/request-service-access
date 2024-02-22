import { body } from 'express-validator';

import { ErrorMessages } from '../error.messages';

export const descriptionValidation = [
    body('description').isLength({ max: 1000 }).withMessage(ErrorMessages.DESCRIPTION_LENGTH),
];
