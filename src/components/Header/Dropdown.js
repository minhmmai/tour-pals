import React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import classes from './Dropdown.module.scss';

const Dropdown = ({ children, label }) => {
    return (
        <ul className={classes.Dropdown}>
            {label}
            <ArrowDropDownIcon />
            <div className={classes.DropdownContent}>
                {children}
            </div>
        </ul>
    )
};

export default Dropdown;