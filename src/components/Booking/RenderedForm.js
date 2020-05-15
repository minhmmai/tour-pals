import React, { useState } from "react";

import Button from "../UI/Button/Button";
import Adjust from "../FormElements/Adjust";
import Date from "../FormElements/Date";
import Input from "../FormElements/Input";
import Select from "../FormElements/Select";
import Section from "../FormElements/Section";
import Stepper from "../FormElements/Stepper";

import { getForm, validateField, updateObject } from "../../shared/utility";
import classes from "./RenderedForm.module.scss";
import { useEffect, useCallback } from "react";

const RenderedForm = (props) => {
  const form = getForm(props.formName);
  const [activeSection, setActiveSection] = useState(0);
  const [sections, setSections] = useState([]);
  const [fields, setFields] = useState([]);

  const initForm = useCallback(() => {
    const formSections = [];
    const formFields = []

    for (let key in form.sections) {
      formSections.push({
        sectionId: key,
        label: form.sections[key].label,
        title: form.sections[key].title,
        description: form.sections[key].description
      });
    }
    setSections(formSections);

    for (let sectionKey in form.sections) {
      const sectionFields = []
      for (let fieldKey in form.sections[sectionKey].fields) {
        sectionFields.push({
          id: fieldKey,
          ...form.sections[sectionKey].fields[fieldKey]
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
    event.preventDefault();
    const updatedFields = [...fields];
    let valid = true;
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
    valid && setActiveSection((prevActiveSection) => prevActiveSection + 1);
  };

  const handleBack = event => {
    event.preventDefault();
    setActiveSection((prevActiveSection) => prevActiveSection - 1);
  };

  const handleReset = () => {
    initForm();
    setActiveSection(0);
  };

  const changeHandler = (event, fieldIndex) => {
    const updatedField = updateObject(fields[activeSection][fieldIndex], {
      value: event.target.value
    });
    const updatedFields = [...fields];
    updatedFields[activeSection][fieldIndex] = updatedField;
    setFields(updatedFields);
  };

  const increase = (fieldValue, fieldIndex) => {
    const updatedFields = [...fields];
    if (fieldValue >= 0) {
      updatedFields[activeSection][fieldIndex].value = (fieldValue + 1).toString();
    }
    setFields(updatedFields);
  }

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
          <div>
            All done!
              You will receive a confirmation email very soon. If any questions, feel free to contact us at 1234 1234.<br />Thank you for choosing Tour Pals!.

            <Button onClick={event => handleReset(event)}            >
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
                    description={section.description}
                  >
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
                            name={field.id}
                            optional={field.validations.isRequired ? false : true}
                            options={field.options}
                            tooltip={field.tooltip}
                            type={field.type}
                            value={field.value}
                          />
                        );
                      } else if (field.type === "adjust") {
                        const minValue = typeof (field.validations.valueRange.min) === "object"
                          ? parseInt(fields[field.validations.valueRange.min.fieldRef[0]][field.validations.valueRange.min.fieldRef[1]].value)
                          : parseInt(field.validations.valueRange.min);
                        const maxValue = typeof (field.validations.valueRange.max) === "object"
                          ? parseInt(fields[field.validations.valueRange.max.fieldRef[0]][field.validations.valueRange.max.fieldRef[1]].value)
                          : parseInt(field.validations.valueRange.max);
                        renderedField = (
                          <Adjust
                            increase={() => increase(parseInt(field.value), index, minValue, maxValue)}
                            decrease={() => decrease(parseInt(field.value), index, minValue, maxValue)}
                            description={field.description}
                            error={field.errorMsg ? field.errorMsg : ""}
                            handleChange={(event) => changeHandler(event, index)}
                            key={index}
                            label={field.label}
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
      <div>
        <Button
          disabled={activeSection === 0}
          clicked={event => handleBack(event)}
          type="back">
          Back
                </Button>
        <Button clicked={event => handleNext(event)} type="next">
          {activeSection === sections.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </form>
  );
};

export default RenderedForm;
