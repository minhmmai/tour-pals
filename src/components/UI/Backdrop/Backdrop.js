import React from 'react';
import classes from './Backdrop.module.scss';

const Backdrop = ({clicked, show}) => (
    show
        ? <div className={classes.Backdrop} onClick={clicked}> </div>
        : null
);

export default Backdrop;