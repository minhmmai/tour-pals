import React from 'react';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

import classes from './ServiceInfo.module.scss';

const ServiceInfo = props => {
  const { children, value, index, ...other } = props;

  return (
    <List className={classes.ServiceInfo}
    component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </List>
  );
}

export default ServiceInfo;