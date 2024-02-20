import { body } from 'express-validator';
import { ErrorMessages } from './error.messages';
import { descriptionValidation } from './fields/description.validation';
import { repoNameValidation } from './fields/repo-name.validation';

export const repoRequest = [
    ...repoNameValidation,
    body('repo_name').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.TEAM_NAME),
    ...descriptionValidation,
    body('description').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.DESCRIPTION)
];
