import { body } from 'express-validator';

import { ErrorMessages } from './error.messages';
import { descriptionValidation } from './fields/description.validation';

export const teamRequest = [
    body('team_name').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.TEAM_NAME),
    ...descriptionValidation
];
