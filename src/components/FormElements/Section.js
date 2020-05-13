import React from "react";

import classes from "./Section.module.scss";

const Section = props => {
  const {activeSection, children,  index, title, description } = props;
  return (
    <fieldset
      className={classes.Section}
      hidden={index !== activeSection}
    >
      <legend><h3 className={classes.Legend}>{title}</h3></legend>
      <p className={classes.Description}>
        {description}
      </p>
      {children}
    </fieldset>
  );
};
export default Section;
