import React from 'react';
import { Link } from 'react-router-dom';

import classes from './NavItem.module.scss';

const NavItem = props => {
    const {children, exact, link} = props;
    return (
        <li className={classes.NavItem}>
            <Link
                className={classes.LinkText}
                exact={exact}
                to={link}>{children}
            </Link>
        </li>
    )
};

export default NavItem;