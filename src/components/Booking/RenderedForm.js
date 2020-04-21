import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Input from "../Form/Input";
import Select from "../Form/Select";
import Section from "../Form/Section";

import { getForm } from "../../shared/utility";
import classes from "./RenderedForm.module.scss";

const RenderedForm = (props) => {
  const form = getForm(props.formName);
  const [activeSection, setActiveSection] = useState(0);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    let retrievedFields = [];
    form.sections.forEach((section) => {
      section.fields.forEach((field) => {
        retrievedFields[field.id] = { value: field.value };
      });
    });
    setFields(retrievedFields);
  }, [form.sections]);

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
    let updatedFields = [
      ...fields,
      (fields[fieldId] = { value: event.target.value }),
    ];
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
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button
              onClick={handleReset}
              className={classes.button}
              variant="contained"
              color="primary"
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
                            className={classes.Field}
                            key={field.id}
                            type={field.type}
                            title={field.label}
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
                            className={classes.Field}
                            key={field.id}
                            title={field.label}
                            name={field.id}
                            options={field.options.map((option) => option.label)}
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
                        className={classes.button}
                      >
                        Back
                    </Button>

                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleNext}
                        className={classes.button}
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
