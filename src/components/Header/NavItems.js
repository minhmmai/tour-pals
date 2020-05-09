import React from 'react';

import NavItem from './NavItem';
import classes from './NavItems.module.scss';
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";

const NavItems = () => {
    return (
        <ul className={classes.NavItems}>
            <NavItem link="/" exact="true">Home</NavItem>
            <NavItem link="/destinations">Destinations</NavItem>
            <NavItem link="/services">Services</NavItem>
            <Dropdown label="My Trips">
                <DropdownItem link="/manage-booking">Manage Booking</DropdownItem>
                <DropdownItem link="/enquire">Enquire</DropdownItem>
            </Dropdown>
            <NavItem link="/about-us">About Us</NavItem>
        </ul>
    )
};

export default NavItems;