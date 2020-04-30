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
    const result = []

    if (!rules) {
        return true;
    }
    if (rules.isRequired) {
        if (typeof(field.value) === "string") {
            if (field.value.trim() !== '' && isValid) {
                isValid = true
            }else {
                isValid = false;
                result.push(rules.isRequired.errorMsg)
            }
        }else {
            if (field.value !== '' && isValid) {
                isValid = true
            }else {
                isValid = false;
                result.push(rules.isRequired.errorMsg)
            }
        }
    }

    if (rules.length) {
        if (field.value.length >= rules.length.min && field.value.length <= rules.length.max && isValid) {
            isValid = true
        } else {
            isValid = false;
            result.push(rules.length.errorMsg)
        }
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (pattern.test(field.value) && isValid) {
            isValid = true
        } else {
            isValid = false;
            result.push(rules.isEmail.errorMsg)
        }
    }
    if (rules.valueRange) {
        const minValue = typeof (rules.valueRange.min) === 'string'
            ? getValue(rules.valueRange.min) : rules.min;
        const maxValue = typeof (rules.valueRange.max) === 'string'
            ? getValue(rules.valueRange.max) : rules.max;

        if (field.value.length >= minValue && field.value.length <= maxValue && isValid) {
            isValid = true
        }else {
            isValid = false;
            result.push(rules.valueRange.errorMsg)
        }
    }

    result.unshift(isValid)

    return result;
};