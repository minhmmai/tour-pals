import React from 'react';
import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
    const { children, modalClosed, show } = props;
    return (
        <div>
            <Backdrop show={show} clicked={modalClosed} />
            <div
                className={classes.Modal}>
                {children}
            </div>
        </div>
    )
};

export default React.memo(Modal, (prevProps, nextProps) =>
    nextProps.show !== prevProps.show &&
    nextProps.children === prevProps.children);