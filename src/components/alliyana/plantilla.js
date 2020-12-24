import React from 'react';
import clsx from 'clsx';
import { AppBar, CssBaseline, Divider, Drawer, IconButton, List, Toolbar } from '@material-ui/core';


import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems,secondaryListItems } from '../ui/ListItems';
import { useStyles, nombreAplicacion } from '../../styles/theme';
import {FootBar } from '../ui/FootBar'
import {ToolBarScreen } from '../ui/ToolBarScreen'




export const AlliyanaScreen = () => {

    //Theme
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    //Theme end 



    return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        
        <ToolBarScreen classes={classes}/>
      </Toolbar>

      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>{ nombreAplicacion }
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        Contenido


        <FootBar classes={classes}/>  
      </main>
    </div>
    )
}
