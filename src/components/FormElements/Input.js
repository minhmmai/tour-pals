import React from 'react';

import Tooltip from './Tooltip';
import classes from './Field.module.scss';

const Input = (props) => {
  const { description, error, handleChange, name, optional, label, tooltip, type } = props
  return (
    <div className={classes.Field}>
      <div className={classes.Label}>
        <label htmlFor={name}>{label}</label>
        {optional && <span>(optional)</span>}
        {tooltip && <Tooltip content={tooltip} />}
      </div>
      <div className={classes.Input}>
        <input id={name} name={name} type={type} onChange={handleChange} />
      </div>
      {error !== "" && <p className={classes.Error}>{error}</p>}
      {description && <p className={classes.Description}>{description}</p>}
    </div>
  );
};

export default Input;
