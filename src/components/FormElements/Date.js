import React from 'react';

import Tooltip from './Tooltip';
import classes from './Field.module.scss';

const Date = (props) => {
  const { description, error, handleChange, name, optional, label, isShown, isValid, isTouched, tooltip, value } = props
  return (
    <div className={[classes.Field, !isShown && classes.Hidden].join(" ")}>
      <div className={classes.Label}>
        <label htmlFor={name}>{label}</label>
        {optional && <span>(optional)</span>}
        {tooltip && <Tooltip content={tooltip} />}
      </div>
      <div className={classes.Date}>
        <input id={name} name={name} type="date" onChange={handleChange} value={value} />
      </div>
      {isShown && isValid && isTouched && <p className={classes.Error}>{error}</p>}
      {description && <p className={classes.Description}>{description}</p>}
    </div>
  );
};

export default Date;
