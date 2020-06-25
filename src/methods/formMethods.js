import dayjs from 'dayjs';

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
    // Prepare a set of new fields to be used in form's state    
    let newSections = [];
    let newSection = {};
    formObj.sections.forEach(section => {
        newSection = {
            sectionId: section.sectionId,
            label: section.label,
            title: section.title,
            description: section.description,
            fields: []
        };
        section.fields.forEach(field => {
            const newField = {
                fieldId: field.fieldId,
                type: field.type,
                label: field.label,
                ...(field.description && { description: field.description }),
                ...(field.tooltip && { tooltip: field.tooltip }),
                ...(field.options && { options: field.options }),
                ...(field.showIf && { showIf: field.showIf }),
                validations: field.validations ? field.validations : undefined,
                touched: false,
                value: field.value,
            };
            newSection.fields.push(newField);
        });
        newSections.push(newSection);
    });

    return { sections: newSections }
};

// Return a boolean whether field is displayed or not
export const showField = (formObj, showIf) => {
    // This evaluate individual show-if rule
    const evalShowIfRule = showIfRule => {
        let isShown = true;
        const val = showIfRule.value;
        const type = showIfRule.type;
        const ref = showIfRule.ref.fieldRef
            ? getRefField(formObj, showIfRule.ref.fieldRef).value
            : showIfRule.ref;

        if (type === "equal") { isShown = ref === val && isShown; }
        if (type === "greater") { isShown = ref > val && isShown; }
        if (type === "smaller") { isShown = ref < val && isShown; }
        if (type === "differ") { isShown = ref !== val && isShown; }

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
export const validateField = (formObj, fieldObj) => {

    const value = typeof (fieldObj.value) === "string" ? fieldObj.value.trim() : fieldObj.value;
    const rules = fieldObj ? fieldObj.validations : {};

    if (!rules) {
        return [true, ""];
    }
    if (rules.isRequired) {
        if (value === "") {
            return [false, rules.isRequired.errorMsg]
        }
    }

    if (value && rules.length) {
        const min = rules.length.min.fieldRef
            ? getRefField(formObj, rules.length.min.fieldRef).value
            : parseInt(rules.length.min)
        const max = rules.length.max.fieldRef
            ? getRefField(formObj, rules.length.max.fieldRef).value
            : parseInt(rules.length.max)
        if (value.length < min || value.length > max) {
            return [false, rules.length.errorMsg]
        }
    }

    if (value && rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!pattern.test(value)) {
            return [false, rules.isEmail.errorMsg]
        }
    }

    if (value && rules.valueRange) {
        const min = rules.valueRange.min.fieldRef
            ? parseInt(getRefField(formObj, rules.valueRange.min.fieldRef).value) || 0
            : parseInt(rules.valueRange.min)
        const max = rules.valueRange.max.fieldRef
            ? parseInt(getRefField(formObj, rules.valueRange.max.fieldRef).value) || 0
            : parseInt(rules.valueRange.max)
        if (parseInt(value) === 0) { return [true, ""] };
        if (value < min || value >= max) {
            return [false, rules.valueRange.errorMsg]
        }
    }

    if (value && rules.withinNext12Months) {
        const dateValue = dayjs(value);
        const minValue = dayjs();
        const maxValue = minValue.add(12, "month");

        if (dateValue.isAfter(maxValue) || dateValue.isBefore(minValue)) {
            return [false, rules.withinNext12Months.errorMsg]
        }
    }
    return [true, ""];
};