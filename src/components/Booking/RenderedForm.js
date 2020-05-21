import React, { useState } from "react";

import Button from "../UI/Button/Button";
import Adjust from "../FormElements/Adjust";
import Date from "../FormElements/Date";
import Input from "../FormElements/Input";
import Select from "../FormElements/Select";
import Section from "../FormElements/Section";
import Stepper from "../FormElements/Stepper";

import { getForm, validateField, updateObject, fieldIsShown } from "../../shared/utility";
import classes from "./RenderedForm.module.scss";
import { useEffect, useCallback } from "react";

const RenderedForm = (props) => {
  const form = props.type && getForm(props.type);
  const [activeSection, setActiveSection] = useState(0);
  const [sections, setSections] = useState([]);
  const [fields, setFields] = useState([]);

  const initForm = useCallback(() => {
    const formSections = [];
    const formFields = []

    // Populate sections from form JSON
    for (let key in form.sections) {
      formSections.push({
        sectionId: key,
        label: form.sections[key].label,
        title: form.sections[key].title,
        description: form.sections[key].description
      });
    }
    setSections(formSections);

    // Populate fields from form JSON
    for (let sectionKey in form.sections) {
      const sectionFields = []
      for (let fieldKey in form.sections[sectionKey].fields) {
        const field = form.sections[sectionKey].fields[fieldKey];
        sectionFields.push({
          id: fieldKey,
          isShown: field.showIf ? false : true,
          ...field
        })
      }
      formFields.push(sectionFields)
    }
    setFields(formFields);
  }, [form])

  useEffect(() => {
    initForm();
  }, [initForm]);

  const handleNext = event => {
    // Prevent the default refresh
    event.preventDefault();

    // Update section's validity
    const updatedFields = [...fields];
    let valid = true;
    // Check validity of each field in this section
    for (let i = 0; i < fields[activeSection].length; i++) {
      const updatedField = fields[activeSection][i]
      const result = validateField(fields, updatedField, updatedField.validations);
      for (let key in result) {
        if (result[key] !== "passed") {
          updatedField["errorMsg"] = result[key];
          valid = false;
          break;
        } else {
          updatedField["errorMsg"] = "";
          valid = valid === true;
        }
      }
      updatedFields[activeSection][i] = updatedField;
    }
    setFields(updatedFields);

    // Check section validity and go to the next section
    valid && setActiveSection(prevActiveSection => prevActiveSection + 1);
  };

  const handleBack = event => {
    // Prevent the default refresh
    event.preventDefault();

    // Go back to previous section
    setActiveSection((prevActiveSection) => prevActiveSection - 1);
  };

  const handleReset = () => {
    // Initialize form
    initForm();
    // Set active section to the first one
    setActiveSection(0);
  };

  const changeHandler = (event, fieldIndex) => {
    // Get value from user input and set state for "fields"
    const updatedField = updateObject(fields[activeSection][fieldIndex], {
      value: event.target.value
    });
    const updatedFields = [...fields];
    updatedFields[activeSection][fieldIndex] = updatedField;
    setFields(updatedFields);

    // Update other field's visibility in case it reference to this change
    updatedFields[activeSection].forEach(field => {
      if (field.showIf) {
        field.isShown = fieldIsShown(fields, field.showIf);
      }
    })
  };

  // Increase function for adjust field
  const increase = (fieldValue, fieldIndex) => {
    const updatedFields = [...fields];
    if (fieldValue >= 0) {
      updatedFields[activeSection][fieldIndex].value = (fieldValue + 1).toString();
    }
    setFields(updatedFields);
  }

  // Decrease function for adjust field
  const decrease = (fieldValue, fieldIndex) => {
    const updatedFields = [...fields];
    if (fieldValue > 0) {
      updatedFields[activeSection][fieldIndex].value = (fieldValue - 1).toString();
    }
    setFields(updatedFields);
  };

  return (
    <form className={classes.Form}>
      <Stepper formSteps={sections.map(({ label }) => label)} formActiveStep={activeSection} />
      <div>
        {activeSection === sections.length ? (
          <div className={classes.Finished}>
            <div className={classes.Heading}>All done!</div>
            <div className={classes.Message}>
              You will receive a confirmation email very soon. If any questions, feel free to contact us at 1234 1234.<br />Thank you for choosing Tour Pals!.
            </div>
            <Button onClick={handleReset} type="reset">
              Book Another Tour
            </Button>
          </div>
        ) : (
            <div>
              {sections.map((section, index) => {
                return (
                  <Section
                    activeSection={activeSection}
                    index={index}
                    key={section.sectionId}
                    title={section.title}
                    description={section.description}>
                    {fields[activeSection].map((field, index) => {
                      let renderedField = "";
                      if (field.type === "text") {
                        renderedField = (
                          <Input
                            description={field.description}
                            error={field.errorMsg ? field.errorMsg : ""}
                            handleChange={(event) => changeHandler(event, index)}
                            key={index}
                            label={field.label}
                            show={field.isShown}
                            name={field.id}
                            optional={field.validations.isRequired ? false : true}
                            tooltip={field.tooltip}
                            type={field.type}
                            value={field.value}
                          />
                        );
                      } else if (field.type === "select") {
                        renderedField = (
                          <Select
                            description={field.description}
                            error={field.errorMsg ? field.errorMsg : ""}
                            handleChange={(event) => changeHandler(event, index)}
                            key={index}
                            label={field.label}
                            show={field.isShown}
                            name={field.id}
                            optional={field.validations.isRequired ? false : true}
                            options={field.options}
                            tooltip={field.tooltip}
                            value={field.value}
                          />
                        );
                      } else if (field.type === "date") {
                        renderedField = (
                          <Date
                            description={field.description}
                            error={field.errorMsg ? field.errorMsg : ""}
                            handleChange={(event) => changeHandler(event, index)}
                            key={index}
                            label={field.label}
                            show={field.isShown}
                            name={field.id}
                            optional={field.validations.isRequired ? false : true}
                            options={field.options}
                            tooltip={field.tooltip}
                            type={field.type}
                            value={field.value}
                          />
                        );
                      } else if (field.type === "adjust") {
                        let min = field.validations.valueRange.min;
                        let max = field.validations.valueRange.max;
                        const minValue = typeof (min) === "object"
                          ? parseInt(fields[min.fieldRef[0]][min.fieldRef[1]].value)
                          : parseInt(min);
                        const maxValue = typeof (max) === "object"
                          ? parseInt(fields[max.fieldRef[0]][max.fieldRef[1]].value)
                          : parseInt(max);
                        renderedField = (
                          <Adjust
                            increase={() => increase(parseInt(field.value), index, minValue, maxValue)}
                            decrease={() => decrease(parseInt(field.value), index, minValue, maxValue)}
                            description={field.description}
                            error={field.errorMsg ? field.errorMsg : ""}
                            handleChange={(event) => changeHandler(event, index)}
                            key={index}
                            label={field.label}
                            show={field.isShown}
                            name={field.id}
                            optional={field.validations.isRequired ? false : true}
                            tooltip={field.tooltip}
                            type={field.type}
                            value={field.value < 0 ? field.value = 0 : field.value}
                          />
                        );
                      }
                      return renderedField;
                    })};
                  </Section>
                );

              })}
            </div>
          )}
      </div>
      <div hidden={activeSection === sections.length}>
        <Button
          clicked={event => handleBack(event)}
          disabled={activeSection === 0}
          type="back">
          Back
                </Button>
        <Button
          clicked={event => handleNext(event)}
          type="next">
          {activeSection === sections.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </form>
  );
};

export default RenderedForm;
