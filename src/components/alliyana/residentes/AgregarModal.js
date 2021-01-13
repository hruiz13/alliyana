import React, { useEffect, useState } from 'react'
import { Button, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { editResident, saveResident } from '../../../actions/residents';

const formInit  = {
    nombre: '',
    email: '',
    celular: '',
    lote: ''
}

export const AgregarModal = ({classes, handleClose, rowSelected,isEditing}) => {

    const dispatch = useDispatch();
    const [form, setForm] = useState(formInit);
    const {nombre, email, celular, lote} = form;
    
    const handleChange = ({target}) =>{
        setForm({
            ...form,
            [target.name] : target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isEditing){
            dispatch(editResident(form))
        }else{
            dispatch(saveResident(form));
        }
        handleClose();
    }
    useEffect(() => {
        if(isEditing){
            setForm({
                id: rowSelected.id,
                nombre: rowSelected.nombre,
                email: rowSelected.email,
                celular: rowSelected.celular,
                lote: rowSelected.lote
            })
        }
       
    }, [rowSelected, isEditing])

    
    return (
        <>
        <DialogTitle id="alert-dialog-title">{"Agregando usuario"}</DialogTitle>
        <DialogContent>
        

        <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
            <div>
                <TextField required id="nombre" label="Nombre Completo" name="nombre" value={nombre} onChange={handleChange}/>
                <TextField required id="email" type="email" label="Correo electronico" name="email" value={email} onChange={handleChange}/>
                <TextField required id="celular" label="Celular" name="celular" value={celular} onChange={handleChange}/>
                <TextField required id="lote" label="Lote numero:" name="lote" value={lote} onChange={handleChange}/>
                
                <div>

                <Button variant="outlined" type="submit" color="primary">
                Guardar
                </Button>
                </div>
            </div>
        </form>
      </DialogContent>
      </>
    )
}
