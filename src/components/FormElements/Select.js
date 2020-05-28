import React from "react";

import Tooltip from './Tooltip';
import classes from "./Field.module.scss";

const Select = (props) => {
  const { description, error, handleChange, name, options, label, show, tooltip, value } = props
  return (
    <div className={[classes.Field, !show && classes.Hidden].join(" ")}>
      <div className={classes.Label}>
        <label htmlFor={name}>
          {label}
        </label>
        {tooltip && <Tooltip content={tooltip} />}
      </div>
      <div className={classes.Select}>
        <select
          name={name}
          value={value}
          onChange={handleChange}>
          {options.map(option => {
            return (
              <option key={option.value} value={option.value} label={option.label}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      {error && <p className={classes.Error}>{error}</p>}
      {description && <p className={classes.Description}>{description}</p>}
    </div>
  );
};

export default Select;
