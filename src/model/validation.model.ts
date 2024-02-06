import { ErrorMessages } from '../validation/error.messages';

export interface FormattedValidationErrors {
    [key: string]: any,
    errorList: {
        href: string,
        text: ErrorMessages
    }[]
}
