import React from "react";

import classes from "./Section.module.scss";

const Section = props => {
  const { children, isHidden, title, description } = props;
  return (
    <div
      className={classes.Section}
      hidden={isHidden}
    >
      <legend><h3 className={classes.Legend}>{title}</h3></legend>
      <h4 className={classes.Description}>
        {description}
      </h4>
      {children}
    </div>
  );
};
export default Section;
