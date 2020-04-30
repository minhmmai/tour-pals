import React from 'react';
import Alert from '@material-ui/lab/Alert';

import classes from './CustomAlert.module.scss';

const CustomAlert = props => {
    return (
        <div className={classes.CustomAlert}>
            {props.alerts.map((alert, index) => {
                return <Alert className={classes.Alert} key={index} severity="error">{alert}</Alert>
            })}
        </div>
    )
};

export default CustomAlert;
