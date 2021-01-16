import { combineReducers } from "redux";
import { uiReducer } from "./uiReducer";
import {residentsReducer} from "./residentsReducer"
import { calendarReducer } from "./calendarReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    residents: residentsReducer
})