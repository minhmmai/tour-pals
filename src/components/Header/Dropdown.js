import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import classes from './Dropdown.module.scss';

const Dropdown = ({ children, label }) => {
    return (
        <ul className={classes.Dropdown}>
            {label}
            &nbsp;
            <FontAwesomeIcon icon={faCaretDown} />
            <div className={classes.DropdownContent}>
                {children}
            </div>
        </ul>
    )
};

export default Dropdown;