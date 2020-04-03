import React from 'react';

import NavigationItem from './NavigationItem';
import classes from './NavigationItems.module.scss'

const NavigationItems = props => {
    return (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact="true">Our Destinations</NavigationItem>
                <NavigationItem link="/services">Our Services</NavigationItem>
                <NavigationItem link="/about">About Us</NavigationItem>
            </ul>
    )
};

export default NavigationItems;