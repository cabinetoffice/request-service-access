import { body } from 'express-validator';

import { ErrorMessages } from '../error.messages';
import { descriptionValidation } from '../fields/description.validation';
import { checkDateFieldIfRadioButtonSelected } from '../fields/helper/date.validation.helper';
import { githubHandleValidation } from '../fields/github-handle.validation';

export const member = [
    body('first_name').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.FIRST_NAME),
    body('last_name').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.LAST_NAME),
    ...githubHandleValidation,
    body('email_address').not().isEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.EMAIL_ADDRESS_EMPTY).bail().isEmail().withMessage(ErrorMessages.EMAIL_ADDRESS_INVALID),
    body('contract_type').notEmpty().withMessage(ErrorMessages.CONTRACT_TYPE),
    body('contract_end_date').custom((value, { req }) => checkDateFieldIfRadioButtonSelected(req.body.contract_type === 'non_permanent', ErrorMessages.CONTRACT_END_DATE, ErrorMessages.CONTRACT_DATE_TIME, value)),
    ...descriptionValidation
];
