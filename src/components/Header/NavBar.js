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
    const closeMenu = () => {
        setMenuOpen(false);
    };
    return (
        <header>
            <nav className={classes.NavBar}>
                <Logo link="/" />
                <Button type="cta">Book Now!</Button>
                <ToggleButton clicked={toggleMenu} menuIsOpen={menuOpen} />
                <NavItems />
            </nav>
                <NavItemsMobile isOpen={menuOpen} itemClicked={closeMenu}/>
        </header>
    )
};

export default NavBar;
