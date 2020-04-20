export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getForm = (formName) => {
    return (require(`../store/forms/${formName}.json`));
};


export const getFormSections = (formObj) => {
    const sections = [];
    formObj.sections.forEach((section) => {
      sections.push(section);
    });
    return sections;
  };
