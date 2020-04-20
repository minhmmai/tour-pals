import React from 'react';

const Select = (props) => {
    return(
        <fieldset className="form-section" hidden={props.index !== props.activeSection}>
            <legend>{props.label}</legend>
            {props.description}
            {props.children}
      </fieldset>)
}

export default Select;