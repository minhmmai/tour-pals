import React from 'react';

import NavItem from './NavItem';
import classes from './NavItemsMobile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const NavItemsMobile = props => {
    const { isOpen, itemClicked } = props
    return (
        <ul className={classes.NavItemsMobile}
            style={{
                transform: isOpen ? 'translateY(0)' : 'translateY(-100vh)'
            }}>
            <NavItem link="/" exact="true" clicked={itemClicked}>Home</NavItem>
            <NavItem link="/destinations" clicked={itemClicked}>Destinations</NavItem>
            <NavItem link="/services" clicked={itemClicked}>Services</NavItem>
            <NavItem link="/about-us" clicked={itemClicked}>About Us</NavItem>
            <div className={classes.Dropdown}>
                <NavItem link="#">My Trips <FontAwesomeIcon icon={faCaretDown} /></NavItem>
                <div className={classes.DropdownItem}>
                    <NavItem link="/manage-booking" clicked={itemClicked}>Manage Booking</NavItem>
                    <NavItem link="/enquire" clicked={itemClicked}>Enquire</NavItem>
                </div>
            </div>
        </ul>
    )
};

export default NavItemsMobile;