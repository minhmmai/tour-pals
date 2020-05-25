import * as dayjs from 'dayjs';

export const getForm = formType => {
    return require(`../store/forms/${formType}.json`);
};

// Return he field object given the form and the field reference
const getRefField = (formObj, ref) => {
    const refArr = ref.split(".");
    const section = formObj.sections.find(el => el.sectionId === refArr[0]);
    const field = section && section.fields.find(el => el.fieldId === refArr[1]);

    return field;
};

// Initialize all form's fields
export const initFormState = formObj => {
    const newFormObj = { ...formObj };
    let sections = [];
    let fields = [];

    // Find and replace all field reference object with a getter
    const evalRefs = (fieldObj) => {
        for (let key in fieldObj) {
            if (fieldObj[key] instanceof Array && fieldObj[key].length > 0) {
                // If this property is an array
                fieldObj[key].forEach(el => {
                    evalRefs(el);
                })
            } else if (fieldObj[key] instanceof Object) {
                // If this property is an object
                if (fieldObj[key].fieldRef) {
                    const ref = fieldObj[key].fieldRef;
                    delete fieldObj[key];
                    Object.defineProperty(fieldObj, key, {
                        get: function () { return getRefField(newFormObj, ref).value }
                    });
                }
                else {
                    evalRefs(fieldObj[key]);
                }
            }
        }
    }

    // Prepare a set of new fields to be used in form's state
    newFormObj.sections.forEach(section => {
        fields = [];
        section.fields.forEach(field => {
            evalRefs(field);
            const newField = {
                fieldId: field.fieldId,
                value: field.value,
                // errorMsg: "",
                validations: field.validations ? field.validations : undefined,
                ...(field.showIf &&  {showIf: field.showIf})
            };
            Object.defineProperty(newField, "isShown", {
                get: function () { return showField(newField.showIf) }
            });
            Object.defineProperty(newField, "isValid", {
                get: function () { return newField.isShown ? validateValue(newField.value, newField.validations) : true }
            });
            Object.defineProperty(newField, "errorMsg", {
                get: function () { return this.isValid[1] }
            });
            fields.push(newField)
        });
        sections.push(fields)
    });
    return { sections }
};

// Return a boolean whether field is displayed or not
export const showField = (showIf) => {
    // This evaluate individual show-if rule
    const evalShowIfRule = showIfRule => {
        let isShown = true;
        const val = showIfRule.value;

        if (showIfRule.type === "equal") {
            isShown = showIfRule.ref === val && isShown;
        }
        if (showIfRule.type === "greater") {
            isShown = showIfRule.ref > val && isShown;
        }
        if (showIfRule.type === "smaller") {
            isShown = showIfRule.ref < val && isShown;
        }
        if (showIfRule.type === "differ") {
            isShown = showIfRule.ref !== val && isShown;
        }
        return isShown;
    };

    // This evaluate the whole show-if object
    const evalShowIf = showIfObj => {
        let result = true;

        if (!showIfObj) { return true }

        if (showIfObj["and"]) {
            let andResult = true;
            showIfObj["and"].forEach(andEl => {
                andResult = evalShowIf(andEl) && andResult;
                result = andResult;
            })
        } else if (showIfObj["or"]) {
            let orResult = false;
            showIfObj["or"].forEach(orEl => {
                orResult = evalShowIf(orEl) || orResult;
                result = orResult;
            })
        } else {
            return evalShowIfRule(showIfObj)
        }
        return result;
    }
    return evalShowIf(showIf);
};

// Validate input, return on the first failed validation
// So that each field won't show too many error at one time
export const validateValue = (inputValue, rules) => {

    const value = inputValue.trim();

    if (!rules) {
        return [true, ""];
    }
    if (rules.isRequired) {
        return value === "" && [false, rules.isRequired.errorMsg]
    }

    if (value && rules.length) {
        return !(value.length >= rules.length.min && value.length <= rules.length.max)
            && [false, rules.length.errorMsg]
    }

    if (value && rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return !pattern.test(value) && [false, rules.isEmail.errorMsg]

    }

    if (value && rules.valueRange) {
        return !(value >= rules.valueRange.min && value < rules.valueRange.max)
            && [false, rules.valueRange.errorMsg]
    }

    if (value && rules.dateRange) {
        const dateValue = dayjs(value);
        const minValue = dayjs();
        const maxValue = minValue.add(12, "month");

        return !(dateValue.isBefore(maxValue) && dateValue.isAfter(minValue))
            && [false, rules.dateRange.errorMsg]
    }

    return [true, ""];
};