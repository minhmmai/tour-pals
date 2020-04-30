export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getForm = (formName) => {
    return (require(`../store/forms/${formName}.json`));
};

export const validateField = (allFields, fieldValue, rules) => {
    const getValue = refString => {
        let refValue = 0;
        for (let i = 0; i < allFields.length; i++) {
            if (refValue === 0) {
                for (let j = 0; j < allFields[i].length; j++) {
                    if (allFields[i][j].id === refString) {
                        refValue = allFields[i][j].value;
                        break;
                    }
                }
            } else {
                break;
            }
        }
        return refValue;
    }
    let isValid = true;

    if (!rules) {
        return true;
    }
    if (rules.isRequired) {
        typeof (fieldValue) === 'string'
            ? isValid = fieldValue.trim() !== '' && isValid
            : isValid = fieldValue !== '' && isValid
    }
    if (rules.length) {
        isValid = fieldValue.length >= rules.length.min && isValid
        isValid = fieldValue.length <= rules.length.max && isValid;
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(fieldValue) && isValid
    }
    if (rules.valueRange) {
        const minValue = typeof (rules.valueRange.min) === 'string'
            ? getValue(rules.valueRange.min) : rules.min;
        const maxValue = typeof (rules.valueRange.max) === 'string'
            ? getValue(rules.valueRange.max) : rules.max;

        isValid = fieldValue.length >= minValue && isValid
        isValid = fieldValue.length <= maxValue && isValid;
    }
    return isValid;
};