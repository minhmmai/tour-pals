import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import classes from './InfoItem.module.scss';

const InfoItem = props => {
    const { children, avatar, alt, title } = props;

    return (
        <ListItem className={classes.InfoItem} alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={alt} src={require(`../../assets/icon/${avatar}`)}  variant="rounded" />
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={
                    <React.Fragment>
                        {children}
                    </React.Fragment>
                }
            />
        </ListItem>)
};

export default InfoItem;