import { body } from 'express-validator';
import { ErrorMessages } from './error.messages';
import { descriptionValidation } from './fields/description.validation';
import { teamNameValidation } from './fields/team-name.validation';

export const teamRequest = [
    ...teamNameValidation,
    body('team_name').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.TEAM_NAME),
    ...descriptionValidation,
    body('description').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.DESCRIPTION)
];
