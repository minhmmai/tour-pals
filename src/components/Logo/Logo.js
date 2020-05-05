import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Logo.module.scss';

const Logo = props => {
    return (
        <div className={classes.Logo}>
            <Link to={props.link} className={classes.LogoText}>
                Tour<span id="pals">Pals</span>
            </Link>
        </div>
    )
};

export default Logo;