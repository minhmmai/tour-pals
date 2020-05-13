import React from "react";
import Typography from "@material-ui/core/Typography";

import classes from "./Section.module.scss";

const Section = props => {
  const {activeSection, children,  index, key, title, description } = props;
  return (
    <fieldset
      className={classes.Section}
      hidden={index !== activeSection}
    >
      <legend><Typography className={classes.Legend} color="secondary" variant="h4">{title}</Typography></legend>
      <Typography className={classes.Description} color="primary" variant="subtitle1">
        {description}
      </Typography>
      {children}
    </fieldset>
  );
};
export default Section;
