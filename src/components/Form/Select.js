import React from "react";
import FormHelperText from '@material-ui/core/FormHelperText';

import Tooltip from './Tooltip';
import classes from "./Field.module.scss";

const Select = (props) => {
  const { description, error, handleChange, name, options, title, tooltip, value } = props
  return (
    <div className={classes.Field}>
      <label className={classes.Label} htmlFor={name}>
        {title}
      </label>
      {tooltip && <Tooltip content={tooltip}></Tooltip>}
      <select
        className={classes.Select}
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
      {error && <p className={classes.Error}>{error}</p>}
      {description && <FormHelperText className={classes.Description}>{description}</FormHelperText>}
    </div>
  );
};

export default Select;
