import { body } from 'express-validator';

import { ErrorMessages } from '../error.messages';
import { githubHandleValidation } from '../fields/github-handle.validation';
import { repoNameValidation } from '../fields/repo-name.validation';

export const collaborator = [
    body('first_name').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.FIRST_NAME),
    body('last_name').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.LAST_NAME),
    ...githubHandleValidation,
    body('email_address').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.EMAIL_ADDRESS_EMPTY).bail().isEmail().withMessage(ErrorMessages.EMAIL_ADDRESS_INVALID),
    ...repoNameValidation,
];
