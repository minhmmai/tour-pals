import * as dayjs from 'dayjs';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getForm = (formName) => {
    return (require(`../store/forms/${formName}.json`));
};

export const validateField = (allFields, field, rules) => {

    const result = {}
    const value = field.value.trim();

    const getValue = refArr => {
        return parseInt(allFields[refArr.fieldRef[0]][refArr.fieldRef[1]].value);
    }


    if (!rules) {
        return true;
    }
    if (rules.isRequired) {
        value !== ""
            ? result["isRequired"] = "passed"
            : result["isRequired"] = rules.isRequired.errorMsg
    }

    if (value && rules.length) {
        (value.length >= rules.length.min && value.length <= rules.length.max)
            ? result["length"] = "passed"
            : result["length"] = rules.length.errorMsg
    }

    if (value && rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        pattern.test(value)
            ? result["isEmail"] = "passed"
            : result["isEmail"] = rules.isEmail.errorMsg

    }

    if (value && rules.valueRange) {
        const minValue = typeof (rules.valueRange.min) === 'object'
            ? getValue(rules.valueRange.min.fieldRef) : rules.valueRange.min;
        const maxValue = typeof (rules.valueRange.max.fieldRef) === 'object'
            ? getValue(rules.valueRange.max) : rules.valueRange.max;

        (value >= minValue && value <= maxValue)
            ? result["valueRange"] = "passed"
            : result["valueRange"] = rules.valueRange.errorMsg
    }

    if (value && rules.dateRange) {
        const dateValue = dayjs(value);
        const minValue = dayjs();
        const maxValue = minValue.add(12, "month");

        dateValue.isBefore(maxValue) && dateValue.isAfter(minValue)
            ? result["dateRange"] = "passed"
            : result["dateRange"] = rules.dateRange.errorMsg
    }

    return result;
};