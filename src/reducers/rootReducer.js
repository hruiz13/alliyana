import { combineReducers } from "redux";
import { uiReducer } from "./uiReducer";
import {residentsReducer} from "./residentsReducer"


export const rootReducer = combineReducers({
    ui: uiReducer,
    residents: residentsReducer
})