import { DateTime } from 'luxon';

export const checkDateFieldIfRadioButtonSelected = (selected: boolean, errMsgDate: string, errMsgTime: string, value: string = '') => {

    if (!selected) {
        return true;
    }

    if (value === '') {
        throw new Error(errMsgDate);
    }

    const inputDate = DateTime.fromISO(value, { zone: 'utc' });

    const now = DateTime.now();
    const oneYearFromNow = now.plus({ years: 1 });

    if (!inputDate.isValid) {
        throw new Error(errMsgDate);
    }

    if (inputDate > oneYearFromNow) {
        throw new Error(errMsgTime);
    }

    return true;
};
