import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Stepper from "../FormElements/Stepper";
import Button from "../UI/Button/Button";
import Section from "../FormElements/Section";
import Spinner from "../UI/Spinner/Spinner";
import Adjust from "../FormElements/Adjust";
import Date from "../FormElements/Date";
import Input from "../FormElements/Input";
import Select from "../FormElements/Select";
import { updateObject } from "../../methods/utility";
import { initFormState, getForm, validateSection, showField, validateField } from "../../methods/formMethods";
import classes from "./RenderedForm.module.scss";

const RenderedForm = (props) => {
  const formObj = props.type && getForm(props.type);

  const [activeSection, setActiveSection] = useState(0);
  const [form, setForm] = useState();

  let sections = [];
  let fields = [];

  const Fields = {
    adjust: Adjust,
    date: Date,
    text: Input,
    select: Select
  };

  useEffect(() => {
    const retrievedForm = initFormState(formObj);
    setForm(retrievedForm);
  }, [formObj]);

  const handleNext = event => {
    // Prevent the default refresh
    event.preventDefault();

    // Check section validity and go to the next section
    const sectionIsValid = validateSection(form.sections[activeSection]);
    sectionIsValid && setActiveSection(prevActiveSection => prevActiveSection + 1);
  };

  const handleBack = event => {
    // Prevent the default refresh
    event.preventDefault();

    // Go back to previous section
    activeSection === 0
      ? setActiveSection((prevActiveSection) => prevActiveSection - 1)
      : props.onDeselectService()
  };

  const handleReset = () => {
    // Initialize form
    setForm(initFormState(formObj));
    // Set active section to the first one
    setActiveSection(0);
  };

  const changeHandler = (event, fieldIndex) => {
    event.preventDefault();
    setForm(prevForm => {
      const updatedForm = { ...prevForm };
      updatedForm.sections[activeSection].fields[fieldIndex].value = event.target.value;
      updatedForm.sections[activeSection].fields[fieldIndex].touched = true;
      return updatedForm
    });
  };

  const enterKeyPress = event => {
    event.preventDefault();
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
  const decrease = (fieldIndex) => {
    /* const updatedFields = [...fields];
    if (fieldValue > 0) {
      updatedFields[activeSection][fieldIndex].value = (fieldValue - 1).toString();
    }
    setFields(updatedFields); */
  };

  return (
    form ? <form className={classes.Form}>
      <Stepper formSteps={form.sections.map(({ label }) => label)} formActiveStep={activeSection} />
      <div>
        {activeSection === form.sections.length ? (
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
              {form.sections.map((section, sectionIndex) => {
                return (
                  <Section
                    key={section.sectionId}
                    title={section.title}
                    isHidden={sectionIndex !== activeSection}
                    description={section.description}>
                    {form.sections[activeSection].fields.map((field, index) => {
                      const validity = field.touched && validateField(form, field);
                      const isShown = showField(form, field.showIf);
                      return (Fields[field.type] && isShown)
                        && React.createElement(Fields[field.type], {
                          description: field.description || undefined,
                          error: validity[0] ? "" : validity[1],
                          handleChange: (event) => changeHandler(event, index),
                          key: field.fieldId,
                          label: field.label,
                          name: field.id,
                          onEnter: event => enterKeyPress(event),
                          optional: field.validations.isRequired.errorMsg ? false : true,
                          options: field.options || undefined,
                          show: true,
                          tooltip: field.tooltip || undefined,
                          value: field.value,
                          increase: () => increase(field.value, index),
                          decrease: () => decrease(field.value, index)
                        });
                    })}
                  </Section>
                );
              })}
            </div>
          )}
      </div>
      <div hidden={activeSection === form.sections.length}>
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
      </div>
    </form> : <Spinner />
  );
};

const mapStateToProps = state => {
  return {
    service: state.service.selectedSerive
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeselectService: () => dispatch(actions.deselectService())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RenderedForm);
