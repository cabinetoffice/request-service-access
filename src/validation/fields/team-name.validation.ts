import { body } from 'express-validator';

import { ErrorMessages } from '../error.messages';

export const teamNameValidation = [
    body('team_name').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.TEAM_NAME)
];
