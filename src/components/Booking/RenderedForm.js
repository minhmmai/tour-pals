import React, { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Input from "../Form/Input";
import Select from "../Form/Select";
import Section from "../Form/Section";
import CustomAlert from '../Form/CustomAlert';

import { getForm, validateField, updateObject } from "../../shared/utility";
import classes from "./RenderedForm.module.scss";
import { useEffect } from "react";
import { useCallback } from "react";

const RenderedForm = (props) => {
  const form = getForm(props.formName);
  const [activeSection, setActiveSection] = useState(0);
  const [sections, setSections] = useState([]);
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState([]);

  const initForm = useCallback(() => {
    const formSections = [];
    const formFields = []

    for (let key in form.sections) {
      formSections.push({
        sectionId: key,
        label: form.sections[key].label,
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

  const handleNext = () => {
    console.log(sections);
    console.log(fields);
    const newErrors = []
    fields[activeSection].forEach(field => {
      field.valid = validateField(fields, field, field.validations)
    })
    if (newErrors.length > 0) {
      setErrors(newErrors)
    } else {
      setErrors([])
      setActiveSection((prevActiveSection) => prevActiveSection + 1);
    }
  };

  const handleBack = () => {
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
    updatedFields[activeSection][fieldIndex] = updatedField

    setFields(updatedFields);
  };

  return (
    <form className={classes.Form}>
      <Stepper
        activeStep={activeSection}
        alternativeLabel
        className={classes.Stepper}
      >
        {sections.map((section, index) => {
          return (
            <Step className={classes.Step} key={index}>
              <StepLabel className={classes.StepLabel}>{section.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeSection === sections.length ? (
          <div>
            <Typography className={classes.Complete} color="secondary" variant="h4">
              All done!
            </Typography>
            <Typography className={classes.Instruction} color="primary" variant="subtitle1">
              You will receive a confirmation email real soon. If any questions, feel free to contact us at 1234 1234.<br />We're sure you will enjoy your trip.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset}
              className={classes.Button}
            >
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
                    label={section.label}
                    description={section.description}
                  >
                    {errors.length > 0 &&
                      <CustomAlert alerts={errors} />
                    }
                    {fields[activeSection].map((field, index) => {
                      let renderedField = "";
                      if (field.type === "text") {
                        renderedField = (
                          <Input
                            description={field.description}
                            key={index}
                            type={field.type}
                            title={field.label}
                            tooltip={field.tooltip}
                            name={field.id}
                            value={field.value}
                            handleChange={(event) =>
                              changeHandler(event, index)
                            }
                          />
                        );
                      } else if (field.type === "select") {
                        renderedField = (
                          <Select
                            description={field.description}
                            key={index}
                            title={field.label}
                            tooltip={field.tooltip}
                            name={field.id}
                            options={field.options}
                            value={field.value}
                            handleChange={(event) =>
                              changeHandler(event, index)
                            }
                          />
                        );
                      }
                      return renderedField;
                    })}
                    <div>
                      <Button
                        disabled={activeSection === 0}
                        onClick={handleBack}
                        className={classes.Button}
                      >
                        Back
                    </Button>

                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleNext}
                        className={classes.Button}
                      >
                        {activeSection === form.sections.length - 1
                          ? "Submit"
                          : "Next"}
                      </Button>
                    </div>
                  </Section>
                );
              })}
            </div>
          )}
      </div>
    </form>
  );
};

export default RenderedForm;
