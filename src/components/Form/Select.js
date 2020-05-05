import React from "react";
import FormHelperText from '@material-ui/core/FormHelperText';

import Tooltip from './Tooltip';
import classes from "./Field.module.scss";

const Select = (props) => {
  const { description, error,handleChange, name, options, label, tooltip, value } = props
  return (
    <div className={classes.Field}>
      <div className={classes.Label}>
      <label htmlFor={name}>
        {label}
      </label>
      {tooltip && <Tooltip content={tooltip}/>}
      </div>
      <div className={classes.Select}>
      <select
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value} label={option.label}>
              {option.label}
            </option>
          );
        })}
      </select>
      </div>
      {error && <p className={classes.Error}>{error}</p>}
      {description && <FormHelperText className={classes.Description}>{description}</FormHelperText>}
    </div>
  );
};

export default Select;
