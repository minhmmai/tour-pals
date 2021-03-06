import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Stepper from "../FormElements/Stepper";
import Button from "../UI/Button/Button";
import Section from "../FormElements/Section";
import Spinner from "../UI/Spinner/Spinner";
import Adjust from "../FormElements/Adjust";
import Date from "../FormElements/Date";
import Time from "../FormElements/Time";
import Input from "../FormElements/Input";
import Select from "../FormElements/Select";
import { initFormState, getForm, showField, validateField } from "../../methods/formMethods";
import classes from "./RenderedForm.module.scss";

const RenderedForm = (props) => {

  let formHeading, formObj;

  if (props.type) {
    formObj = getForm(props.type);
    if (props.type === "airport") {
      formHeading = "Airport Transfer";
    } else if (props.type === "tour") {
      formHeading = "Private Tour";
    } else if (props.type === "hourly") {
      formHeading = "By-The-Hour";
    }

  }

  const [activeSection, setActiveSection] = useState(0);
  const [form, setForm] = useState();

  const Fields = {
    adjust: Adjust,
    date: Date,
    select: Select,
    text: Input,
    time: Time,
  };

  useEffect(() => {
    const retrievedForm = initFormState(formObj);
    setForm(retrievedForm);
  }, [formObj]);

  const handleNext = (event) => {
    event.preventDefault();
    const updatedForm = { ...form };
    const fields = updatedForm.sections[activeSection].fields;
    let sectionIsValid = true;
    for (let i = 0; i < fields.length; i++) {
      const isShown = showField(updatedForm, fields[i].showIf);
      const isValid = validateField(updatedForm, fields[i])[0];
      if (isShown) {
        if (isValid) {
          sectionIsValid = true && sectionIsValid;
        } else {
          fields[i].touched = true;
          sectionIsValid = false && sectionIsValid;
        }
      } else {
        sectionIsValid = true && sectionIsValid;
      }
    };
    console.log(sectionIsValid);
    sectionIsValid
      ? setActiveSection(prevActiveSection => prevActiveSection + 1)
      : setForm(updatedForm);
  };

  const handleBack = (event) => {
    event.preventDefault();
    // Go back to previous section
    activeSection === 0
      ? props.history.push("/booking")
      : setActiveSection((prevActiveSection) => prevActiveSection - 1)
  };

  const handleReset = () => {
    // Deselect service
    props.history.push("/booking");
  };

  const changeHandler = (event, fieldIndex) => {
    setForm(prevForm => {
      const updatedForm = { ...prevForm };
      updatedForm.sections[activeSection].fields[fieldIndex].value = event.target.value;
      updatedForm.sections[activeSection].fields[fieldIndex].touched = true;
      return updatedForm
    });
  };

  const enterKeyPress = event => {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }

  // Increase function for adjust field
  const increase = (fieldValue, fieldIndex) => {
    setForm(prevForm => {
      const updatedForm = { ...prevForm };
      if (parseInt(fieldValue) >= 0) {
        updatedForm.sections[activeSection].fields[fieldIndex].value = (parseInt(fieldValue) + 1).toString();
        updatedForm.sections[activeSection].fields[fieldIndex].touched = true;
      }
      return updatedForm;
    });
  }

  // Decrease function for adjust field
  const decrease = (fieldValue, fieldIndex) => {
    setForm(prevForm => {
      const updatedForm = { ...prevForm };
      if (parseInt(fieldValue) > 0) {
        updatedForm.sections[activeSection].fields[fieldIndex].value = (parseInt(fieldValue) - 1).toString();
        updatedForm.sections[activeSection].fields[fieldIndex].touched = true;
      }
      return updatedForm;
    });
  };

  const renderedForm = form
    ? <div className={classes.RenderedForm}>
      <section className={classes.FormHeading}>
        <h2>{formHeading}</h2>
        <div className={classes.Stepper}>
          <Stepper formSteps={form.sections.map(({ label }) => label)} formActiveStep={activeSection} />
        </div>
      </section>
      <section className={classes.FormArea}>
        {activeSection === form.sections.length ? (
          <div className={classes.Finished}>
            <h3 className={classes.Heading}>All done!</h3>
            <p className={classes.Message}>
              You will receive a confirmation email very soon. If any questions, feel free to contact us at 1234 1234.<br />Thank you for choosing Tour Pals!.
            </p>
            <Button clicked={handleReset} type="reset">
              Book Another Service
            </Button>
          </div>
        ) : (
            <form className={classes.Form}>
              <div className={classes.FormSection} >
                <div>
                  {form.sections.map((section, sectionIndex) => {
                    return (
                      <Section
                        key={section.sectionId}
                        title={section.title}
                        isHidden={sectionIndex !== activeSection}>
                        <h4 className={classes.SectionDescription}>{section.description}</h4>
                        {form.sections[activeSection].fields.map((field, index) => {
                          const validity = validateField(form, field);
                          const isShown = showField(form, field.showIf);
                          const isTouched = field.touched;
                          return (Fields[field.type])
                            && React.createElement(Fields[field.type], {
                              description: field.description || undefined,
                              error: validity[0] ? "" : validity[1],
                              handleChange: (event) => changeHandler(event, index),
                              key: field.fieldId,
                              label: field.label,
                              name: field.id,
                              onEnter: event => enterKeyPress(event),
                              optional: field.validations.isRequired ? false : true,
                              options: field.options || undefined,
                              tooltip: field.tooltip || undefined,
                              value: field.value,
                              isTouched: isTouched,
                              isShown: isShown,
                              isValid: validity[1],
                              increase: field.type === "adjust" ? () => increase(field.value, index) : undefined,
                              decrease: field.type === "adjust" ? () => decrease(field.value, index) : undefined
                            });
                        })}
                      </Section>
                    );
                  })}
                </div>
              </div>
            </form>
          )}
      </section>
      <section className={classes.FormButtons} hidden={activeSection === form.sections.length}>
        <Button
          clicked={event => handleBack(event)}
          type="back">
          Back
        </Button>
        <Button
          clicked={event => handleNext(event)}
          type="next">
          {activeSection === form.sections.length - 1 ? "Submit" : "Next"}
        </Button>
      </section>
    </div> : <Spinner />;
  return renderedForm;
};

export default withRouter(RenderedForm);
