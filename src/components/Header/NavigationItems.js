import React from 'react';

import NavigationItem from './NavigationItem';
import classes from './NavigationItems.module.scss'

const NavigationItems = props => {
    return (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact="true">Home</NavigationItem>
                <NavigationItem link="/about-us">About Us</NavigationItem>
                <NavigationItem link="/services">Services</NavigationItem>
                <NavigationItem link="/testimonials">Testimonials</NavigationItem>
                <NavigationItem link="/contact">Contact</NavigationItem>
            </ul>
    )
};

export default NavigationItems;