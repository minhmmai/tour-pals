import React from "react";

import classes from "./Field.module.scss";

const Select = (props) => {
  return (
    <div className={classes.Field}>
      <label className={classes.Label} htmlFor={props.name}>
        {" "}
        {props.title}{" "}
      </label>
      <select
        className={classes.Select}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      >
        {props.options.map((option) => {
          return (
            <option key={option.value} value={option.value} label={option.label}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
