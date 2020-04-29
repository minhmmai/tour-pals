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
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.isRequired) {
        typeof(fieldValue) === 'string'
        ? isValid = fieldValue.trim() !== '' && isValid
        : isValid = fieldValue !== '' && isValid
    }

    if (rules.length) {
        isValid = fieldValue.length >= rules.min && isValid;
        isValid = fieldValue.length <= rules.max && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(fieldValue) && isValid
    }

    if (rules.valueRange) {

        const getValue = refString => {
            let refValue = 0;

            allFields.forEach(sectionFields => {
                sectionFields.forEach(field => {
                    refValue = field.fieldId === refString && field.value;
                })
            })
            return refValue;
        }

        if (typeof (rules.valueRange.min) === 'string') {
            isValid = fieldValue >= getValue(rules.valueRange.min) && isValid
        } else if (typeof (rules.valueRange.max) === 'string') {
            isValid = fieldValue < getValue(rules.valueRange.max) && isValid
        }
        else {
            isValid = fieldValue >= rules.valueRange.min && isValid;
            isValid = fieldValue < rules.valueRange.max && isValid;
        }
    }
    return isValid;
}