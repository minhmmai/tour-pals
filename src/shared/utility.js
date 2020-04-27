export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getForm = (formName) => {
    return (require(`../store/forms/${formName}.json`));
};


export const validateValue = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.isRequired) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.minValue) {
        if (typeof(rules.minValue) === 'string') {
            isValid = value >= rules.minValue.value && isValid
        }else {
            isValid = value >= rules.minValue && isValid
        }
    }

    if (rules.maxValue) {
       if (typeof(rules.maxValue) === 'string') {
            isValid = value < rules.maxValue.value && isValid
        }else {
            isValid = value < rules.maxValue && isValid
        }
    }

    return isValid;
}