import React from 'react';
import { Link } from 'react-router-dom';

import classes from './NavigationItem.module.scss';

const NavigationItem = props => {
    return (
        <li className={classes.NavigationItem}>
            <Link
                to={props.link}
                exact={props.exact}>{props.children}
            </Link>
        </li>
    )
};

export default NavigationItem;