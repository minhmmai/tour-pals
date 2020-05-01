import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

import Tooltip from './Tooltip';
import classes from './Field.module.scss';

const Input = (props) => {
  const {description, error, handleChange, name, optional, title, tooltip, type } = props
  return (
    <div className={classes.Field}>
      <label htmlFor={name} className={classes.Label}>
        {title}
      </label>
      {optional && <span>(optional)</span>}
      {tooltip && <Tooltip content={tooltip}/>}
      <input
        className={classes.Input}
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

export default Input;
