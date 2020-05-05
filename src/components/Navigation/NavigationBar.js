import React from 'react';

import NavigationItems from './NavigationItems';
import Button from '../UI/Button/Button';
import Logo from '../Logo/Logo';
import classes from './NavigationBar.module.scss';

const NavigationBar = props => {
    return (
        <nav className={classes.NavigationBar}>
        <Logo />
            <NavigationItems />
        <Button type="cta">Book Now!</Button>
        </nav>
    )
};

export default NavigationBar;
