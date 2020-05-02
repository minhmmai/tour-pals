import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

import Tooltip from './Tooltip';
import classes from './Field.module.scss';

const Date = (props) => {
  const {description, error, handleChange, name, optional, label, tooltip, type } = props
  return (
    <div className={classes.Field}>
      <label htmlFor={name} className={classes.Label}>
        {label}
      </label>
      {optional && <span>(optional)</span>}
      {tooltip && <Tooltip content={tooltip}/>}
      <input
        className={classes.Date}
        id={name}
        name={name}
        type={type}
        onChange={handleChange}
      />
      {error !== "" && <p className={classes.Error}>{error}</p>}
      {description && <FormHelperText className={classes.Description}>{description}</FormHelperText>}
    </div>
  );
};

export default Date;
