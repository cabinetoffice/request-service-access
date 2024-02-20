import { body } from 'express-validator';

import { ErrorMessages } from './error.messages';
import { descriptionValidation } from './fields/description.validation';
import { teamNameValidation } from './fields/team-name.validation';

export const addTeam = [
    ...teamNameValidation,
    body('team_maintainer_github_handle').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.TEAM_MAINTAINER_GITHUB_HANDLE),
    ...descriptionValidation
];
