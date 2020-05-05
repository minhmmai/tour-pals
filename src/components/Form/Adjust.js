import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from "@material-ui/core/Button";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import Tooltip from './Tooltip';
import classes from './Field.module.scss';

const Adjust = (props) => {
  const { description, error, handleChange, name, optional, label, tooltip, value, increase, decrease } = props;

  return (
    <div className={classes.Field}>
      <div className={classes.Label}>
        <label htmlFor={name}>{label}</label>
        {optional && <span>(optional)</span>}
        {tooltip && <Tooltip content={tooltip} />}
      </div>
      <div className={classes.Adjust}>
        <Button className={classes.Control} onClick={decrease}><RemoveIcon /></Button>
        <input id={name} name={name} onChange={handleChange} value={value} />
        <Button className={classes.Control} onClick={increase}><AddIcon /></Button>
      </div>
      {error !== "" && <p className={classes.Error}>{error}</p>}
      {description && <FormHelperText className={classes.Description}>{description}</FormHelperText>}
    </div>
  );
};

export default Adjust;
