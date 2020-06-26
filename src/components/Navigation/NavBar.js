import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from "react-router-dom";

import NavItems from './NavItems';
import NavItemsMobile from './NavItemsMobile';
import Button from '../UI/Button/Button';
import Logo from '../Logo/Logo';
import ToggleButton from "../Navigation/ToggleButton";
import classes from './NavBar.module.scss';

const NavBar = props => {
    const [toggleMenuIsOpen, setToggleMenuIsOpen] = useState(false);

    const toggleMenu = () => {
        setToggleMenuIsOpen(!toggleMenuIsOpen);
    };
    const closeMenu = () => {
        setToggleMenuIsOpen(false);
    };

    const tglMenu = useRef();
    const handleClick = e => {
        if (tglMenu.current.contains(e.target)) { return; } // inside click
        closeMenu();// outside click
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    });

    return (
        <header ref={tglMenu}>
            <nav className={classes.NavBar}>
                <Logo link="/" />
                <NavItems />
                <Button type="cta" clicked={() => props.history.push("/booking")}>Book Now!</Button>
                <ToggleButton clicked={toggleMenu} menuIsOpen={toggleMenuIsOpen} />
            </nav>
            <NavItemsMobile isOpen={toggleMenuIsOpen} itemClicked={closeMenu} />
        </header>
    )
};
export default withRouter(NavBar);
