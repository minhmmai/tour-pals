import React, { useState, useEffect } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Input from "../Form/Input";
import Select from "../Form/Select";
import Section from "../Form/Section";

import { getForm, validateField, updateObject } from "../../shared/utility";
import classes from "./RenderedForm.module.scss";

const RenderedForm = (props) => {
  const form = getForm(props.formName);
  const [activeSection, setActiveSection] = useState(0);
  const [fields, setFields] = useState({});

  useEffect(() => {
    let retrievedFields = {};
    form.sections.forEach((section) => {
      section.fields.forEach((field) => {
        retrievedFields[field.id] = {
          value: field.value,
          validation: field.validation,
          valid: field.valid
        };
      });
    });
    setFields(retrievedFields);
  }, [form]);

  const handleNext = () => {
    setActiveSection((prevActiveSection) => prevActiveSection + 1);
  };

  const handleBack = () => {
    setActiveSection((prevActiveSection) => prevActiveSection - 1);
  };

  const handleReset = () => {
    setActiveSection(0);
  };

  const changeHandler = (event, fieldId) => {
    const updatedField = updateObject(fields[fieldId], {
      value: event.target.value,
      valid: validateField(event.target.value, fields[fieldId].validation)
    });
    const updatedFields = updateObject(fields, {
      [fieldId]: updatedField
    });
    setFields(updatedFields);
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
                    {section.fields.map((field, index) => {
                      let renderedField = "";
                      if (field.type === "text") {
                        renderedField = (
                          <Input
                            description={field.description}
                            key={field.id}
                            type={field.type}
                            title={field.label}
                            tooltip={field.tooltip}
                            name={field.id}
                            value={fields[field.id] && fields[field.id].value}
                            handleChange={(event) =>
                              changeHandler(event, field.id)
                            }
                          />
                        );
                      } else if (field.type === "select") {
                        renderedField = (
                          <Select
                            description={field.description}
                            key={field.id}
                            title={field.label}
                            tooltip={field.tooltip}
                            name={field.id}
                            options={field.options}
                            value={fields[field.id] && fields[field.id].value}
                            handleChange={(event) =>
                              changeHandler(event, field.id)
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
