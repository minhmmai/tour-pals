import React, { useState } from 'react';
import { connect } from 'react-redux';

import NavItems from './NavItems';
import NavItemsMobile from './NavItemsMobile';
import Button from '../UI/Button/Button';
import Logo from '../Logo/Logo';
import ToggleButton from "../Header/ToggleButton";
import classes from './NavBar.module.scss';
import * as actions from '../../store/actions/index';

const NavBar = props => {
    const [toggleMenuIsOpen, setToggleMenuIsOpen] = useState(false);

    const toggleMenu = () => {
        setToggleMenuIsOpen(!toggleMenuIsOpen);
    };
    const closeMenu = () => {
        setToggleMenuIsOpen(false);
    };
    return (
        <header>
            <nav className={classes.NavBar}>
                <Logo link="/" />
                <Button type="cta" clicked={props.onOpenModal}>Book Now!</Button>
                <ToggleButton clicked={toggleMenu} menuIsOpen={toggleMenuIsOpen} />
                <NavItems />
            </nav>
            <NavItemsMobile isOpen={toggleMenuIsOpen} itemClicked={closeMenu} />
        </header>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        onOpenModal: () => dispatch(actions.openModal())
    }
}

export default connect(null, mapDispatchToProps)(NavBar);
