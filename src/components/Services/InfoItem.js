import React from 'react';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';

import classes from './InfoItem.module.scss';
import { Container } from '@material-ui/core';

const InfoItem = props => {
    const { children, avatar, alt, title } = props;

    return (
        <div className={classes.InfoItem}>
            <Avatar className={classes.Avatar} alt={alt} src={require(`../../assets/icon/${avatar}`)} variant="rounded" />
            <div style={{ display: 'block' }}>
                <Typography className={classes.Title} variant="h6">{title}</Typography>
                {children}</div>
        </div>)
};

export default InfoItem;