import React from "react";

import classes from "./Section.module.scss";

const Section = props => {
  const { children, isHidden } = props;
  return (
    <div
      className={classes.Section}
      hidden={isHidden}
    >
      {children}
    </div>
  );
};
export default Section;
