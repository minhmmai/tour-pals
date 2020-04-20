import React from "react";
import Typography from "@material-ui/core/Typography";

import classes from "./Section.module.scss";

const Select = (props) => {
  return (
    <fieldset
      className={classes.Section}
      hidden={props.index !== props.activeSection}
    >
      <legend><Typography  className={classes.Legend} color="secondary" variant="h4">{props.label}</Typography></legend>
      <Typography className={classes.Description} color="primary" variant="subtitle1">
        {props.description}
      </Typography>
      {props.children}
    </fieldset>
  );
};

export default Select;
