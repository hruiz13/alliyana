import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { uiLoading, uiFinishLoading } from './ui'

import Swal from 'sweetalert2';

export const loadCalendar = () =>{
    return async(dispatch) =>{
        dispatch(uiLoading())

        try {
            const resp = await fetchSinToken(`calendario/`);
            const body = await resp.json();
            const settings = body.existe;
            if(body.ok){
               dispatch(calendarLoaded(settings))
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }

        dispatch(uiFinishLoading())
    }
}

export const saveCalendar = (form) =>{
    return async(dispatch) =>{
        dispatch(uiLoading())

        try {
            const resp = await fetchSinToken(`calendario/add`, form, 'POST');
            const body = await resp.json();

            if(body.ok){
               dispatch(loadCalendar())
               Swal.fire('Guardado', body.msg, 'success');
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }

        dispatch(uiFinishLoading())
    }
}

export const updateCalendar = (form) =>{
    return async(dispatch) =>{
        dispatch(uiLoading())
        try {
            const resp = await fetchSinToken(`calendario/update`, form, 'POST');
            const body = await resp.json();

            if(body.ok){
               dispatch(calendarUpdated(form));
               Swal.fire('Guardado', body.msg, 'success');
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }

        dispatch(uiFinishLoading())
    }
}

export const deleteCalendar = (id) =>{
    return async(dispatch) =>{
        dispatch(uiLoading())
        try {
            const resp = await fetchSinToken(`calendario/del/${id}`);
            const body = await resp.json();

            if(body.ok){
               dispatch(calendarDeleted(id));
               Swal.fire('Guardado', body.msg, 'success');
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }

        dispatch(uiFinishLoading())
    }
}


const calendarLoaded = (settings) =>({
    type:types.calendarLoaded,
    payload: settings
})

const calendarUpdated = (form) =>({
    type:types.calendarUpdated,
    payload: form
})

const calendarDeleted = (id) =>({
    type:types.calendarDeleted,
    payload: id
})

