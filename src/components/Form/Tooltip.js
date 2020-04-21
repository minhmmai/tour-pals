import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';

const CustomTooltip = (props) => {
    const styles = {
        tooltip: {
            fontWeight: 300,
            fontSize: '.8rem'
        }
    };

    const StyledTooltip = withStyles(styles)(Tooltip);
    return (
        <StyledTooltip title={props.content} placement="bottom">
            <HelpIcon style={{verticalAlign: 'middle'}}></HelpIcon>
        </StyledTooltip>
    );
};

export default CustomTooltip;
