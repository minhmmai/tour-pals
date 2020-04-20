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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    height: "auto",
    margin: "auto",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "block",
  },
}));

const RenderedForm = (props) => {
  const form = getForm(props.formName);
  const classes = useStyles();
  const [activeSection, setActiveSection] = useState(0);
  const fields = []

  useEffect(() => {
    form.sections.forEach((section) => {
      section.fields.forEach((field) => {
        fields.push(field)
      });
    });
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

  const changeHandler = (event, field) => {
    fields[fields.indexOf(field)].value = event.target.value
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeSection}>
        {form.sections.map((section, index) => {
          return (
            <Step key={index}>
              <StepLabel>{section.label}</StepLabel>
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
                <Section index={index} activeSection={activeSection} key={section.id} label={section.label}>
                  {section.description}
                  {section.fields.map((field, index) => {
                    if (field.type === "text") {
                      return (
                        <Input
                          key={field.id}
                          type={field.type}
                          title={field.label}
                          name={field.id}
                          value
                          placeholder={""}
                          handleChange={(event) => changeHandler(event, field)}
                        />
                      );
                    } else if (field.type === "select") {
                      return (
                        <Select
                          key={field.id}
                          title={field.label}
                          name={field.id}
                          options={field.options.map(option => option.label)}
                          value
                          placeholder={`Select ${field.label}`}
                          handleChange={(event) => changeHandler(event, field)}
                        />
                      );
                    }
                  })}
                </Section>
              );
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
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeSection === form.sections.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenderedForm;
