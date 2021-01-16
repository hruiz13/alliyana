import { types } from "../types/types";

const initialState = {
    calendar: [{
        id: 0,
        title: 'Creacion de website',
        roomId: '1',
        members: '1',
        startDate: new Date(2021, 1, 5, 9, 35),
        endDate: new Date(2021, 1, 5, 11, 30),
        rRule: '',
      }]
}

export const calendarReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.calendarLoaded:
            return {
                ...state,
                calendar: action.payload
            }
        case types.calendarUpdated:
            return {
                ...state,
                calendar: state.calendar.map(
                    e=>(e.id === action.payload.id)? action.payload:e
                )
            }
        case types.calendarDeleted:
            return {
                ...state,
                calendar: state.calendar.filter(
                    e=>(e.id !== action.payload)
                )
            }
    
        default:
            return state;
    }
}