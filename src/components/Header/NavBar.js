import React, { useState } from 'react';

import NavItems from './NavItems';
import NavItemsMobile from './NavItemsMobile';
import Button from '../UI/Button/Button';
import Logo from '../Logo/Logo';
import ToggleButton from "../Header/ToggleButton";
import classes from './NavBar.module.scss';

const NavBar = props => {
    const [toggleMenuIsOpen, setToggleMenuIsOpen] = useState(false);

    const toggleMenu = () => {
        setToggleMenuIsOpen(!toggleMenuIsOpen);
    };
    const closeMenu = () => {
        setToggleMenuIsOpen(false);
    };
    return (
        <header>
            <nav className={classes.NavBar}>
                <Logo link="/" />
                <Button type="cta">Book Now!</Button>
                <ToggleButton clicked={toggleMenu} menuIsOpen={toggleMenuIsOpen} />
                <NavItems />
            </nav>
            <NavItemsMobile isOpen={toggleMenuIsOpen} itemClicked={closeMenu} />
        </header>
    )
};
export default NavBar;
