import { checkDateFieldIfRadioButtonSelected } from '../../../../../src/validation/fields/helper/date.validation.helper';
import { DateTime } from 'luxon';

import { ErrorMessages } from '../../../../../src/validation/error.messages';

describe('checkDateFieldIfRadioButtonSelected unit test suite', () => {

    const errMsgDate = ErrorMessages.CONTRACT_START_DATE;
    const errMsgDateTime = ErrorMessages.CONTRACT_DATE_TIME;

    test('returns true when radio button is not selected', () => {
        expect(checkDateFieldIfRadioButtonSelected(false, errMsgDate, errMsgDateTime)).toBe(true);
    });

    test('throws error when radio button is selected and no date is provided', () => {
        expect(() => checkDateFieldIfRadioButtonSelected(true, errMsgDate, errMsgDateTime))
            .toThrow(errMsgDate);
    });

    test('throws error for invalid date', () => {

        expect(() => checkDateFieldIfRadioButtonSelected(true, errMsgDate, errMsgDateTime, '2024-16-40'))
            .toThrow(errMsgDate);
    });

    test('throws error for a date more than one year from now', () => {
        const futureDate = DateTime.now().plus({ years: 1, days: 1 }).toISO();
        expect(() => checkDateFieldIfRadioButtonSelected(true, errMsgDate, errMsgDateTime, futureDate))
            .toThrow(errMsgDateTime);
    });

    test('returns true for a valid date within the next year', () => {
        const validDate = DateTime.now().plus({ months: 6 }).toISO();
        expect(checkDateFieldIfRadioButtonSelected(true, errMsgDate, errMsgDateTime, validDate)).toBe(true);
    });
});
