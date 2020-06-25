import React from "react";

import classes from "./ToggleButton.module.scss";

const ToggleButton = props => {
    const {clicked, menuIsOpen} = props;

    return (
        <div className={[classes.ToggleButton, menuIsOpen && classes.Active].join(" ")} onClick={clicked}>
            <div></div>
        </div >
    )
};

export default ToggleButton;