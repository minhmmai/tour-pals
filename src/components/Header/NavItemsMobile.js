import React from 'react';

import NavItem from './NavItem';
import classes from './NavItemsMobile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const NavItems = ({isOpen}) => {
    return (
        <ul className={classes.NavItemsMobile}
            style={{
                transform: isOpen ? 'translateY(0)' : 'translateY(-100vh)'
            }}>
            <NavItem link="/" exact="true">Home</NavItem>
            <NavItem link="/destinations">Destinations</NavItem>
            <NavItem link="/services">Services</NavItem>
            <NavItem link="/about-us">About Us</NavItem>
            <div className={classes.Dropdown}>
                <NavItem link="">My Trips <FontAwesomeIcon icon={faCaretDown} /></NavItem>
                <div className={classes.DropdownItem}>
                    <NavItem link="/manage-booking">Manage Booking</NavItem>
                    <NavItem link="/enquire">Enquire</NavItem>
                </div>
            </div>
        </ul>
    )
};

export default NavItems;