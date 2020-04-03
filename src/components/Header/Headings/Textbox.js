import React from 'react';

import Main from './Main';
import Sub from './Sub';
import Button from '../../UI/Button';
import classes from './Textbox.module.scss';

const Headings = props => {
    return (
        <div className={classes.Textbox}>
            <div className={classes.Textbox__headings}>
                <Main>Get 10% off for <br />you & pals</Main>
                <Sub>when you sign up with us before 1st April <br/>and that means any tour and time</Sub>
            </div>
            <div className= {classes.Textbox__btn}>
                <Button>Join Now!</Button>
            </div>
        </div>
    )
};

export default Headings;