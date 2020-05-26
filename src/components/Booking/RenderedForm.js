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
import { initFormState, getForm, validateSection } from "../../methods/formMethods";
import classes from "./RenderedForm.module.scss";

const RenderedForm = (props) => {
  const formObj = props.type && getForm(props.type);

  const [activeSection, setActiveSection] = useState(0);
  const [form, setForm] = useState();

  let sections = [];
  let fields = [];
  const fieldType = {
    adjust: Adjust,
    date: Date,
    input: Input,
    select: Select
  }

  if (form) {
    sections = form.sections;
    fields = form.sections[activeSection].fields
  }

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
  const increase = (fieldIndex) => {
    /*  const updatedFields = [...fields];
    if (fieldValue >= 0) {
      updatedFields[activeSection][fieldIndex].value = (fieldValue + 1).toString();
    }
    setFields(updatedFields);  */
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
      <Stepper formSteps={sections && sections.map(({ label }) => label)} formActiveStep={activeSection} />
      <div>
        {sections && activeSection === sections.length ? (
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
                    {fields.length > 0 && fields.map((field, index) => {
                      const Comp = fieldType[field.type];
console.log(Comp);
                      /* return <Comp
                        type={field.type}
                        description={field.description || undefined}
                        error={field.errorMsg || undefined}
                        handleChange={(event) => changeHandler(event, index)}
                        key={field.fieldId}
                        label={field.label}
                        name={field.id}
                        optional={field.validations.isRequired ? false : true}
                        options={field.options || undefined}
                        show={field.isShown}
                        tooltip={field.tooltip || undefined}
                        value={field.value}
                        increase={() => increase(index)}
                        decrease={() => decrease(index)} /> */
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
