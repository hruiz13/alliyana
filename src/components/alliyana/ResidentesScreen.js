import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { AppBar, CssBaseline, Divider, Drawer, IconButton, List, Toolbar } from '@material-ui/core';


import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems,secondaryListItems } from '../ui/ListItems';
import { useStyles, nombreAplicacion } from '../../styles/theme';
import {FootBar } from '../ui/FootBar'
import {ToolBarScreen } from '../ui/ToolBarScreen'

import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { loadResidents } from '../../actions/residents';

const row = [
    { id: 1, nombre: 'Cargando...'}
];

export const ResidentesScreen = () => {

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

    const dispatch = useDispatch();

    //obteniendo datos de db y guardamos en store
    useEffect(() => {
        dispatch(loadResidents());
    }, [dispatch])

    //sacamos datos del store
    
    const {residents} = useSelector(state => state.residents)


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombre', headerName: 'Nombre', width: 180 },
        { field: 'email', headerName: 'E-mail', width: 210 },
        { field: 'celular', headerName: 'Celular', width: 73 },
        { field: 'lote', headerName: 'Lote', width: 73 }

    ];

    //inicio de las row
    
    const [rows, setRows] = useState(row);

    //cuando llegan los datos de la db
    useEffect(() => {
        if(!!residents){
            setRows(residents);
        }else{
            setRows(row)
        }
    }, [residents])



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
            <div className={classes.container} >
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid 
                rows={rows} 
                columns={columns} 
                pageSize={5}
                />
                </div>
            </div>
        <FootBar classes={classes}/>  
      </main>
    </div>
    )
}
