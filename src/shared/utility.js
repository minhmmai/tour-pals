export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getForm = (formName) => {
    return (require(`../store/forms/${formName}.json`));
};

export const updateFieldsState = (oldState, sectionIndex, fieldIndex, field ) => {
    const updatedFields = oldState;
    updatedFields[sectionIndex][fieldIndex] = field
    return updatedFields;
}

export const validateField = (allFields, field, rules) => {
    const getValue = fieldRef => {
        let refValue = 0;
        for (let i = 0; i < allFields.length; i++) {
            if (refValue === 0) {
                for (let j = 0; j < allFields[i].length; j++) {
                    if (allFields[i][j].id === fieldRef) {
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

    const result = {}

    if (!rules) {
        return true;
    }
    if (rules.isRequired) {
        ((typeof (field.value) === "string" && field.value.trim() !== '')
            || (typeof (field.value) !== "string" && field.value !== ''))
            ? result["isRequired"] = "passed"
            : result["isRequired"] = rules.isRequired.errorMsg
    }


    if (rules.length) {
        (field.value.length >= rules.length.min && field.value.length <= rules.length.max)
            ? result["length"] = "passed"
            : result["length"] = rules.length.errorMsg
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        pattern.test(field.value)
            ? result["isEmail"] = "passed"
            : result["isEmail"] = rules.isEmail.errorMsg

    }
    if (rules.valueRange) {
        const minValue = typeof (rules.valueRange.min) === 'string'
            ? getValue(rules.valueRange.min) : rules.valueRange.min;
        const maxValue = typeof (rules.valueRange.max) === 'string'
            ? getValue(rules.valueRange.max) : rules.valueRange.max;

        (field.value >= minValue && field.value <= maxValue)
            ? result["valueRange"] = "passed"
            : result["valueRange"] = rules.valueRange.errorMsg
    }

    return result;
};