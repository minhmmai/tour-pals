export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getFormJson = (formName) => {
    return require(`../store/forms/${formName}.json`);
}

export const renderForm = formJson => {

    const formData = formJson;

    const formSections = []

    let form = 'Cannot load form';

    for (let section in formData.sections) {
        formSections.push(formData.sections[section])
    }
    return form
};

