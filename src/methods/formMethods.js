import * as dayjs from 'dayjs';

export const getForm = formType => {
    return require(`../store/forms/${formType}.json`);
};

// Initialize all form's fields
export const initFormState = formObj => {
    const newFormObj = { ...formObj };
    let sections = [];
    let fields = [];

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

    newFormObj.sections.forEach(section => {
        fields = [];
        section.fields.forEach(field => {
            evalRefs(field);
            fields.push(field);
        });
        sections.push(section)
    });
    return { sections }
}

const getRefField = (formObj, ref) => {
    const refArr = ref.split(".");
    const section = formObj.sections.find(el => el.sectionId === refArr[0]);
    const field = section && section.fields.find(el => el.fieldId === refArr[1]);

    return field;
};




































/* export const getFieldRelations = formJSON => {
    const relations = {};
    

    formJSON.sections.forEach(section => {
        const sectionId = section.sectionId;
        section.fields.forEach(field => {
            const fieldId = field.fieldId;


            showIfRefs && showIfRefs.length > 0
                && showIfRefs.forEach(refField => {
                    const referencingShowIf = `${sectionId}.${fieldId}.showIf`;
                    if (relations[refField]) {
                        !relations[refField].includes(referencingShowIf)
                            && relations[refField].push(referencingShowIf)
                    } else {
                        relations[refField] = [referencingShowIf]
                    }

                });

            valdiationsRefs && valdiationsRefs.length > 0
                && valdiationsRefs.forEach(refField => {
                    const referencingValidations = `${sectionId}.${fieldId}.validations`;
                    if (relations[refField]) {
                        !relations[refField].includes(referencingValidations)
                            && relations[refField].push(referencingValidations)
                    } else {
                        relations[refField] = [referencingValidations]
                    }

                });
        });
    });
    console.log(relations);
}; */































export const showField = (allFields, showIf) => {

    const evalShowIfRule = showIfRule => {
        let isShown = true;
        const ref = showIfRule.fieldRef;
        const val = showIfRule.value;

        if (showIfRule.type === "equal") {
            isShown = allFields[ref[0]][ref[1]].value === val && isShown;
        }
        if (showIfRule.type === "greater") {
            isShown = allFields[ref[0]][ref[1]].value > val && isShown;
        }
        if (showIfRule.type === "smaller") {
            isShown = allFields[ref[0]][ref[1]].value < val && isShown;
        }
        if (showIfRule.type === "differ") {
            isShown = allFields[ref[0]][ref[1]].value !== val && isShown;
        }
        return isShown;
    };

    const evalShowIf = showIfObj => {
        let result = true;
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

export const validateField = (allFields, field, rules) => {

    const result = {}
    const value = field.value.trim();

    const getValue = refArr => {
        return parseInt(allFields[refArr.fieldRef[0]][refArr.fieldRef[1]].value);
    }

    if (!rules) {
        return true;
    }
    if (field.isShown) {
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

            (value >= minValue && value < maxValue)
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
    } else {
        return true
    }

    return result;
};