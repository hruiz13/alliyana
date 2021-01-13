import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { AppBar, Button, CssBaseline, Dialog, Divider, Drawer, IconButton, List, Toolbar } from '@material-ui/core';


import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems,secondaryListItems } from '../ui/ListItems';
import { useStyles, nombreAplicacion } from '../../styles/theme';
import {FootBar } from '../ui/FootBar'
import {ToolBarScreen } from '../ui/ToolBarScreen'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteResident, loadResidents } from '../../actions/residents';
import { AgregarModal } from './residentes/AgregarModal';

import Swal from 'sweetalert2';

const row = [
    { id: 1, nombre: 'Cargando...'}
];



export const ResidentesScreen = () => {

    //Theme
    const classes = useStyles();
    const [open, setOpen] = useState(true);
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
        { field: 'celular', headerName: 'Celular', width: 210 },
        { field: 'lote', headerName: 'Lote', width: 70 }

    ];

    //inicio de las row
    const [rows, setRows] = useState(row);
    const [rowSelected, setRowSelected] = useState(0)
    const [opciones, setOpciones] = useState(true)

    //cuando llegan los datos de la db
    useEffect(() => {
        if(!!residents){
            setRows(residents);
        }else{
            setRows(row)
        }
    }, [residents])

    //datos y manejo de modal
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const handleClose = () => {
      setIsOpenDialog(false);
      setIsEditing(false)
    };
    const handleClickOpen = () => {
      setIsOpenDialog(true);
    };

    const clickCelda = (e) =>{
      setRowSelected(e.row);
      setOpciones(false)
    }

    const handleDelete = () =>{
      console.log('Eliminando')
      Swal.fire({
        title: 'Seguro desea eliminar?',
        showDenyButton: true,
        confirmButtonText: `Eliminar`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteResident(rowSelected))
          
        } else if (result.isDenied) {
          Swal.fire('No se ha eliminado.', '', 'info')
        }
      })
    }

    const handleEditar = () => {
      setIsEditing(true)
      setIsOpenDialog(true);
    }

    
   
    


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

              <div className={classes.appBarSpacer}>
                <Button variant="contained" color="secondary" onClick={handleClickOpen} >
                  Agregar
                </Button>

                  <IconButton aria-label="delete" style={{marginLeft:'20px', fontSize:'16px'}} disabled={opciones} onClick={handleDelete}>  
                    <DeleteIcon fontSize="small" /> Eliminar No.{rowSelected.id}
                  </IconButton>

                  <IconButton aria-label="edit" color="primary" style={{marginLeft:'20px', fontSize:'16px'}} disabled={opciones} onClick={handleEditar}>  
                    <EditIcon fontSize="small" /> Editar No.{rowSelected.id}
                  </IconButton>
                
                  

                <Dialog
                  open={isOpenDialog}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <AgregarModal classes={classes} handleClose={handleClose} rowSelected={rowSelected} isEditing={isEditing}/>
                </Dialog>
              </div>
              
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid 
                rows={rows} 
                columns={columns} 
                pageSize={5}
                onCellClick={clickCelda}
                />
              </div>
            </div>
        <FootBar classes={classes}/>  
      </main>
    </div>
    )
}
