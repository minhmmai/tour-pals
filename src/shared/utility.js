export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getForm = (formName) => {
    return (require(`../store/forms/${formName}.json`));
};


export const validateField = (fields, field, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.isRequired) {
        isValid = field.value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = field.value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = field.value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(field.value) && isValid
    }

    if (rules.minValue) {
        if (typeof(rules.minValue) === 'string') {
            isValid = field.value >= fields[rules.minValue].value && isValid
        }else {
            isValid = field.value >= rules.minValue && isValid
        }
    }

    if (rules.maxValue) {
       if (typeof(rules.maxValue) === 'string') {
            isValid = field.value < fields[rules.maxValue].value && isValid
        }else {
            isValid = field.value < rules.maxValue && isValid
        }
    }

    return isValid;
}