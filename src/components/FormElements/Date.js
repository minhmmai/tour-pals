import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

import Tooltip from './Tooltip';
import classes from './Field.module.scss';

const Date = (props) => {
  const { description, error, handleChange, name, optional, label, tooltip, type } = props
  return (
    <div className={classes.Field}>
      <div className={classes.Label}>
        <label htmlFor={name}>{label}</label>
        {optional && <span>(optional)</span>}
        {tooltip && <Tooltip content={tooltip} />}
      </div>
      <div className={classes.Date}>
        <input id={name} name={name} type={type} onChange={handleChange} />
      </div>
      {error !== "" && <p className={classes.Error}>{error}</p>}
      {description && <FormHelperText className={classes.Description}>{description}</FormHelperText>}
    </div>
  );
};

export default Date;
