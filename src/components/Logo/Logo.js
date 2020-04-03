import React from 'react';

import LogoImage from '../../assets/logo.png';
import classes from './Logo.module.scss';

const Logo = props => {
    return (
        <div className={classes.Logo}>
            <img src={LogoImage} alt="Tour.io logo"/>
        </div>
    )
};

export default Logo;