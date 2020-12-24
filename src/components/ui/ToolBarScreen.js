import React from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';

import {Badge, IconButton, Typography } from '@material-ui/core';

export const ToolBarScreen = ({classes}) => {

    
    return (
        <>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Alliyana
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        </>
    )
}
