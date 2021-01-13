import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { uiLoading, uiFinishLoading } from './ui'

import Swal from 'sweetalert2';

export const loadResidents = () =>{
    return async(dispatch) =>{
        dispatch(uiLoading())

        try {
            const resp = await fetchSinToken(`residentes/`);
            const body = await resp.json();
            const settings = body.existe;
            if(body.ok){
               dispatch(residentsLoaded(settings))
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }

        dispatch(uiFinishLoading())
    }
}

export const saveResident = (form) =>{
    return async(dispatch) =>{
        dispatch(uiLoading())

        try {
            const resp = await fetchSinToken(`residentes/add`, form, 'POST');
            const body = await resp.json();

            if(body.ok){
               dispatch(loadResidents())
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }

        dispatch(uiFinishLoading())
    }
}

export const editResident = (form) =>{
    return async(dispatch) =>{
        dispatch(uiLoading())

        try {
            const resp = await fetchSinToken(`residentes/edit/${form.id}`, form, 'POST');
            const body = await resp.json();

            if(body.ok){
               dispatch(loadResidents())
               Swal.fire('Actualizado!', '', 'success')
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }

        dispatch(uiFinishLoading())
    }
}

export const deleteResident = (id) =>{
    return async(dispatch) =>{
        dispatch(uiLoading())
        console.log(id)

        try {
            const resp = await fetchSinToken(`residentes/del/${id}`,id, 'DELETE');
            const body = await resp.json();

            if(body.ok){
               dispatch(loadResidents())
               Swal.fire('Eliminado!', '', 'success')
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }

        dispatch(uiFinishLoading())
    }
}



const residentsLoaded = (settings) =>({
    type:types.residentsLoaded,
    payload: settings
})
