import { body } from 'express-validator';
import { descriptionRequiredValidation } from '../fields/description-required.validation';
import { ErrorMessages } from '../error.messages';

export const additionalRequest = [
    body('context').notEmpty({ ignore_whitespace: true }).withMessage(ErrorMessages.CONTEXT), ...descriptionRequiredValidation
];
