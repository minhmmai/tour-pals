import React, { useState } from 'react';

import NavItems from './NavItems';
import NavItemsMobile from './NavItemsMobile';
import Button from '../UI/Button/Button';
import Logo from '../Logo/Logo';
import ToggleButton from "../Header/ToggleButton";
import classes from './NavBar.module.scss';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <header>
            <nav className={classes.NavBar}>
                <Logo link="/" />
                <Button type="cta">Book Now!</Button>
                <ToggleButton clicked={toggleMenu} menuIsOpen={menuOpen}/>
                <NavItems />
                {menuOpen && <NavItemsMobile/>}
            </nav>
        </header>
    )
};

export default NavBar;
