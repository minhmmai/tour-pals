import React from 'react';

import NavItem from './NavItem';
import classes from './NavItems.module.scss';
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";

const NavItems = () => {
    return (
        <ul className={classes.NavItems}>
            <NavItem link="/services">Services</NavItem>
            <NavItem link="/destinations">Destinations</NavItem>
            <Dropdown label="My Trips">
                <DropdownItem link="/manage">Manage Booking</DropdownItem>
                <DropdownItem link="/feedback">Feedback</DropdownItem>
            </Dropdown>
            <NavItem link="/about">About Us</NavItem>
        </ul>
    )
};

export default NavItems;