import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import classes from "./Tooltip.module.scss";

const Tooltip = (props) => {
    return (
        <div className={classes.Tooltip}>
            <FontAwesomeIcon className={classes.Icon} icon={faQuestionCircle} />
            <p className={classes.Content}>{props.content}</p>
        </div>
    );
};

export default Tooltip;
