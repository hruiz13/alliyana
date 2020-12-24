import { types } from "../types/types";

const initialState = {
    residents: null
}

export const residentsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.residentsLoaded:
            return {
                ...state,
                residents: action.payload
            }
        
        
    
        default:
            return state;
    }
}