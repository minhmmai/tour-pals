import React from 'react';

import NavItems from './NavItems';
import Button from '../UI/Button/Button';
import Logo from '../Logo/Logo';
import ToggleButton from "../Header/ToggleButton";
import classes from './NavBar.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';

const NavBar = props => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() =>{
        setIsMobile(window.innerWidth <= 600);
    }, [])
    return (
        <header>
            <nav className={classes.NavBar}>
                <Logo link="/" />
                <Button type="cta">Book Now!</Button>
                <ToggleButton />
                <NavItems isMobile={isMobile}/>              
            </nav>
        </header>
    )
};

export default NavBar;
