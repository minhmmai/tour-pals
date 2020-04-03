import React from 'react';

import classes from './Button.module.scss';

const Button = props => {
    return (
        <button
            className={classes.Button}
            onClick={props.clicked}
            type={props.type}>{props.children}
        </button>
    )
};

export default Button;