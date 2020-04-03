import React from 'react';

import classes from './Main.module.scss';

const Main = props => {
    return (
        <h1 className={classes.Main}>
            {props.children}
        </h1>
    )
};

export default Main;