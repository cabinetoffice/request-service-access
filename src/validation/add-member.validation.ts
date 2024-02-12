import { body } from 'express-validator';

import { ErrorMessages } from './error.messages';
import { descriptionValidation } from './fields/description.validation';

export const addMember = [
    body('first_name').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.FIRST_NAME),
    body('last_name').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.LAST_NAME),
    body('github_handle').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.GIT_HANDLE),
    body('email_address').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.EMAIL_ADDRESS),
    body('contract_type').notEmpty().withMessage(ErrorMessages.CONTRACT_TYPE),
    body('contractor_date').if(body('contract_type').equals('contractor')).notEmpty().withMessage(ErrorMessages.CONTRACTOR_DATE).bail().isDate().withMessage(ErrorMessages.CONTRACTOR_DATE_FORMAT),
    ...descriptionValidation
];
