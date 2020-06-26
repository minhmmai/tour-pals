import React from 'react';

import classes from './Button.module.scss';

const Button = props => {
    const { children, clicked, disabled, type } = props;
    return (
        <button
            className={[classes.Button, classes[type]].join(' ')}
            disabled={disabled}
            onClick={clicked}
            type={type}>
                {children}
        </button>
    )
};

export default Button;