import { body } from 'express-validator';

import { ErrorMessages } from './error.messages';
import { descriptionValidation } from './fields/description.validation';

export const addTeam = [
    body('team_name').notEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.TEAM_NAME),
    body('team_maintainer_github_handle').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.TEAM_MAINTAINER_GITHUB_HANDLE),
    ...descriptionValidation
];
