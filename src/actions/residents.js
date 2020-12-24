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
                console.log(body.existe)
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



const residentsLoaded = (settings) =>({
    type:types.residentsLoaded,
    payload: settings
})
