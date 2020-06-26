import React from 'react';
import { withRouter } from "react-router-dom";

import NavItem from './NavItem';
import Button from "../UI/Button/Button";
import classes from './NavItemsMobile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const NavItemsMobile = props => {
    const { isOpen } = props;

    return (
        <ul className={classes.NavItemsMobile}

            style={{
                transform: isOpen ? 'translateY(0)' : 'translateY(-100vh)'
            }}>
            <Button type="cta" clicked={() => { props.history.push("/booking") }}>Book Now!</Button>
            <NavItem link="/services">Services</NavItem>
            <NavItem link="/destinations">Destinations</NavItem>
            <NavItem link="/about">About Us</NavItem>
            <div className={classes.Dropdown}>
                <NavItem link="#">My Trips <FontAwesomeIcon icon={faCaretDown} /></NavItem>
                <div className={classes.DropdownItem}>
                    <NavItem link="/manage">Manage Booking</NavItem>
                    <NavItem link="/feedback">Feedback</NavItem>
                </div>
            </div>
        </ul>
    )
};

export default withRouter(NavItemsMobile);