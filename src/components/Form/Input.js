import React from 'react';

import classes from './Field.module.scss';

const Input = (props) => {
  return (
    <div className={classes.Field}>
      <label htmlFor={props.name} className={classes.Label}>
        {props.title}
      </label>
      <input
        className={classes.Input}
        id={props.name}
        name={props.name}
        type={props.type}
        onChange={props.handleChange}
      />
    </div>
  );
};

export default Input;
