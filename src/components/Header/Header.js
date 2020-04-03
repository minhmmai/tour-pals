import React from 'react';

import NavigationBar from '../Navigation/NavigationBar';
import Textbox from './Headings/Textbox';
import classes from './Header.module.scss';

const Header = props => {
    return (
        <header className={classes.Header}>
            <NavigationBar />
            <Textbox/>
        </header>
    )
};

export default Header;