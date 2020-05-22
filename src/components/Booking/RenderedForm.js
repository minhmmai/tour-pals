import React, { useState, useEffect } from "react";

import Button from "../UI/Button/Button";
import Adjust from "../FormElements/Adjust";
import Date from "../FormElements/Date";
import Input from "../FormElements/Input";
import Select from "../FormElements/Select";
import Section from "../FormElements/Section";
import Stepper from "../FormElements/Stepper";

import { updateObject } from "../../methods/utility";
import { initFormState, validateField, getForm, showField, getRefField, getFieldRelations } from "../../methods/formMethods";
import classes from "./RenderedForm.module.scss";

const RenderedForm = (props) => {
  const formJSON = props.type && getForm(props.type);

  const [activeSection, setActiveSection] = useState(0);
  const [form, setForm] = useState();

  useEffect(() => {
    setForm(initFormState(formJSON));
  }, [formJSON]);

  const handleNext = event => {
    // Prevent the default refresh
    event.preventDefault();

    /* // Update section's validity
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
    setFields(updatedFields); */

    // Check section validity and go to the next section
    /* valid && */ setActiveSection(prevActiveSection => prevActiveSection + 1);
  };

  const handleBack = event => {
    // Prevent the default refresh
    event.preventDefault();

    // Go back to previous section
    setActiveSection((prevActiveSection) => prevActiveSection - 1);
  };

  const handleReset = () => {
    /* // Initialize form
    setFields(initFormState(formJSON)); */
    // Set active section to the first one
    setActiveSection(0);
  };

  const changeHandler = (event, fieldIndex) => {
    /* // Get value from user input and set state for "fields"
    const updatedField = updateObject(fields[activeSection][fieldIndex], {
      value: event.target.value
    });
    const updatedFields = [...fields];
    updatedFields[activeSection][fieldIndex] = updatedField;
    setFields(updatedFields);

    // Update other field's visibility in case it reference to this change
    updatedFields[activeSection].forEach(field => {
      if (field.showIf) {
        field.isShown = showField(fields, field.showIf);
      }
    }) */
  };

  // Increase function for adjust field
  const increase = (fieldValue, fieldIndex) => {
    /* const updatedFields = [...fields];
    if (fieldValue >= 0) {
      updatedFields[activeSection][fieldIndex].value = (fieldValue + 1).toString();
    }
    setFields(updatedFields); */
  }

  // Decrease function for adjust field
  const decrease = (fieldValue, fieldIndex) => {
    /* const updatedFields = [...fields];
    if (fieldValue > 0) {
      updatedFields[activeSection][fieldIndex].value = (fieldValue - 1).toString();
    }
    setFields(updatedFields); */
  };

  return (
    <div>{/* <form className={classes.Form}>
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
              {sections.map((section, sectionIndex) => {
                return (
                  <Section
                    key={section.sectionId}
                    title={section.title}
                    isHidden={sectionIndex !== activeSection}
                    description={section.description}>
                    {fields.length > 0 && fields[activeSection].map((field, fieldIndex) => {
                      let renderedField = "";
                      if (field.type === "text") {
                        renderedField = (
                          <Input
                            description={field.description}
                            error={field.errorMsg ? field.errorMsg : ""}
                            handleChange={(event) => changeHandler(event, fieldIndex)}
                            key={fieldIndex}
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
                            handleChange={(event) => changeHandler(event, fieldIndex)}
                            key={fieldIndex}
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
                            handleChange={(event) => changeHandler(event, fieldIndex)}
                            key={fieldIndex}
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
                            increase={() => increase(parseInt(field.value), fieldIndex, minValue, maxValue)}
                            decrease={() => decrease(parseInt(field.value), fieldIndex, minValue, maxValue)}
                            description={field.description}
                            error={field.errorMsg ? field.errorMsg : ""}
                            handleChange={(event) => changeHandler(event, fieldIndex)}
                            key={fieldIndex}
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
                    })}
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
    </form> */}</div>
  );
};

export default RenderedForm;
