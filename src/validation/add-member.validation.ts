import { body } from 'express-validator';

import { ErrorMessages } from './error.messages';
import { descriptionValidation } from './fields/description.validation';
import { checkDateFieldIfRadioButtonSelected } from './fields/helper/date.validation.helper';

export const addMember = [
    body('first_name').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.FIRST_NAME),
    body('last_name').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.LAST_NAME),
    body('github_handle').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.GIT_HANDLE),
    body('email_address').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.EMAIL_ADDRESS),
    body('contract_type').notEmpty().withMessage(ErrorMessages.CONTRACT_TYPE),
    body('contract_start_date').custom((value, { req }) => checkDateFieldIfRadioButtonSelected(req.body.contract_type === 'non_permanent', ErrorMessages.CONTRACT_START_DATE, ErrorMessages.CONTRACT_DATE_TIME, value)),
    ...descriptionValidation
];
