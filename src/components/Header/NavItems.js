import React from 'react';

import NavItem from './NavItem';
import classes from './NavItems.module.scss';
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const NavItems = () => {
    return (
        <div className={classes.NavItems}>
            <ul className={classes.Other}>
                <NavItem link="/" exact="true">Home</NavItem>
                <NavItem link="/destinations">Destinations</NavItem>
                <NavItem link="/services">Services</NavItem>
                <Dropdown label="My Trips">
                    <DropdownItem link="/manage-booking">Manage Booking</DropdownItem>
                    <DropdownItem link="/enquire">Enquire</DropdownItem>
                </Dropdown>
                <NavItem link="/about-us">About Us</NavItem>
            </ul>
            <ul className={classes.Mobile}>
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
        </div>
    )
};

export default NavItems;