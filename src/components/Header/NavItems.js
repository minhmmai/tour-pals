import React from 'react';

import NavItem from './NavItem';
import classes from './NavItems.module.scss';
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const NavItems = ({ isMobile }) => {
    let navItems = "";

    !isMobile
        ? navItems = (
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
        ) : navItems = (
            <ul className={classes.NavItems}>
                <NavItem link="/" exact="true">Home</NavItem>
                <NavItem link="/destinations">Destinations</NavItem>
                <NavItem link="/services">Services</NavItem>
                <div className={classes.Dropdown}>
                    <NavItem link="">My Trips <FontAwesomeIcon icon={faCaretDown} /></NavItem>
                    <div className={classes.DropdownItem}>
                        <NavItem link="/manage-booking">Manage Booking</NavItem>
                        <NavItem link="/enquire">Enquire</NavItem>
                    </div>
                </div>
                <NavItem link="/about-us">About Us</NavItem>
            </ul>
        )

    return (
        navItems
    )
};

export default NavItems;