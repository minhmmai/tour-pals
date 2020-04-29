import React, { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Alert from '@material-ui/lab/Alert';

import Input from "../Form/Input";
import Select from "../Form/Select";
import Section from "../Form/Section";

import { getForm, validateField, updateObject } from "../../shared/utility";
import classes from "./RenderedForm.module.scss";
import { useEffect } from "react";

const RenderedForm = (props) => {
  const form = getForm(props.formName);
  const [activeSection, setActiveSection] = useState(0);
  const [sections, setSections] = useState([]);
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const formSections = [];
    const formFields = []

    form.sections.forEach(section => {
      formSections.push({
        sectionId: section.sectionId,
        label: section.label,
        description: section.description
      });
    });
    setSections(formSections);

    form.sections.forEach(section => {
      const sectionFields = []
      section.fields.forEach(field => {
        sectionFields.push(field)
      })
      formFields.push(sectionFields)
    });
    setFields(formFields);
  }, [form]);

  const handleNext = () => {
    const newErrors = []
    fields[activeSection].forEach(sectionField => {
      for (let validation in sectionField.validations) {
        sectionField.validations[validation].valid = validateField(fields, sectionField.value, sectionField.validations);
        !sectionField.validations[validation].valid && newErrors.push(sectionField.validations[validation].errorMsg);
      }
    })
    if (newErrors.length > 0) {
      setErrors(newErrors)
    } else {
      setActiveSection((prevActiveSection) => prevActiveSection + 1);
    }
  };

  const handleBack = () => {
    setActiveSection((prevActiveSection) => prevActiveSection - 1);
  };

  const handleReset = () => {
    setActiveSection(0);
  };

  const changeHandler = (event, fieldIndex) => {
    const updatedField = updateObject(sections[activeSection].fields[fieldIndex], {
      value: event.target.value
    });
    const updatedSections = [...sections];
    updatedSections[activeSection].fields[fieldIndex] = updatedField

    setSections(updatedSections);
  };

  return (
    <form className={classes.Form}>
      <Stepper
        activeStep={activeSection}
        alternativeLabel
        className={classes.Stepper}
      >
        {form.sections.map((section, index) => {
          return (
            <Step className={classes.Step} key={index}>
              <StepLabel className={classes.StepLabel}>{section.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeSection === form.sections.length ? (
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
              {form.sections.map((section, index) => {
                return (
                  <Section
                    activeSection={activeSection}
                    index={index}
                    key={section.sectionId}
                    label={section.label}
                    description={section.description}
                  >
                    {errors.length > 0 &&
                      <div>
                        {errors.map((error, index) => {
                          return <Alert key={index} severity="error">{error}</Alert>
                        })}
                      </div>

                    }
                    {section.fields.map((field, index) => {
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
                            value={section.fields[field.id] && section.fields[field.id].value}
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
                            value={section.fields[field.id] && section.fields[field.id].value}
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
