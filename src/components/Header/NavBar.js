import React from 'react';

import NavItems from './NavItems';
import Button from '../UI/Button/Button';
import Logo from '../Logo/Logo';
import ToggleButton from "../Header/ToggleButton";
import classes from './NavBar.module.scss';

const NavBar = props => {

    return (
        <header>
            <nav className={classes.NavBar}>
                <Logo link="/" />
                <Button type="cta">Book Now!</Button>
                <ToggleButton/>
                <NavItems />
            </nav>
        </header>
    )
};

export default NavBar;
