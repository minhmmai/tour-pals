import React from 'react';

import classes from './ServiceInfo.module.scss';

const ServiceInfo = props => {
  const { children, value, index, ...other } = props;

  return (
    <div className={classes.ServiceInfo}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export default ServiceInfo;