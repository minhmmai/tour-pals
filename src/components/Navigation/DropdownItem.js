import React from 'react';
import { Link } from 'react-router-dom';

import classes from './DropdownItem.module.scss';

const DropdownItem = props => {
    const {children, exact, link} = props;
    return (
        <li className={classes.DropdownItem}>
            <Link
                className={classes.LinkText}
                exact={exact}
                to={link}>{children}                
            </Link>
        </li>
    )
};

export default DropdownItem;