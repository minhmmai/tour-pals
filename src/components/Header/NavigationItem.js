import React from 'react';
import { Link } from 'react-router-dom';

import classes from './NavigationItem.module.scss';

const NavigationItem = props => {
    return (
        <li className={classes.NavigationItem}>
            <Link
                className={classes.LinkText}
                exact={props.exact}
                to={props.link}>{props.children}
            </Link>
        </li>
    )
};

export default NavigationItem;