import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

import Tooltip from './Tooltip';
import classes from './Field.module.scss';

const Input = (props) => {
  return (
    <div className={classes.Field}>
      <label htmlFor={props.name} className={classes.Label}>
        {props.title}
        {props.tooltip
          && <Tooltip content={props.tooltip}>
          </Tooltip>}
      </label>
      <input
        className={classes.Input}
        id={props.name}
        name={props.name}
        type={props.type}
        onChange={props.handleChange}
      />
      {props.description && <FormHelperText className={classes.Description}>{props.description}</FormHelperText>}
    </div>
  );
};

export default Input;
