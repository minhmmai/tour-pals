import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import Tooltip from './Tooltip';
import classes from './Field.module.scss';

const Adjust = (props) => {
  const { description, error, handleChange, name, optional, onEnter, label, isShown, isValid, isTouched, tooltip, value, increase, decrease } = props;

  return (
    <div className={[classes.Field, !isShown && classes.Hidden].join(" ")}>
      <div className={classes.Label}>
        <label htmlFor={name}>{label}</label>
        {optional && <span>(optional)</span>}
        {tooltip && <Tooltip content={tooltip}/>}
      </div>
      <div className={classes.Adjust}>
        <FontAwesomeIcon className={classes.Control} onClick={decrease} icon={faMinus} />
        <input id={name} name={name} onChange={handleChange} onKeyPress={onEnter} readOnly value={value}/>
        <FontAwesomeIcon className={classes.Control} onClick={increase} icon={faPlus} />
      </div>
      {isShown && isValid && isTouched && <p className={classes.Error}>{error}</p>}
      {description && <p className={classes.Description}>{description}</p>}
    </div>
  );
};

export default Adjust;
