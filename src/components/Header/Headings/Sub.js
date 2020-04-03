import React from 'react';

import classes from './Sub.module.scss';

const Sub = props => {
    return (
        <h3 className={classes.Sub}>
            {props.children}
        </h3>
    )
};

export default Sub;