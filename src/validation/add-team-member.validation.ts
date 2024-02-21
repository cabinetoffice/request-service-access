import { body } from 'express-validator';

import { ErrorMessages } from './error.messages';
import { teamNameValidation } from './fields/team-name.validation';

export const addTeamMember = [
    ...teamNameValidation,
    body('team_member_github_handle').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.TEAM_MEMBER_GIT_HANDLE)
];
