import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { AlliyanaScreen } from '../components/alliyana/AlliyanaScreen';
import { CalendarioScreen } from '../components/alliyana/calendario/CalendarioScreen';
import { ResidentesScreen } from '../components/alliyana/ResidentesScreen';

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route 
                    exact path="/"
                    component={ AlliyanaScreen }
                />
                <Route 
                    exact path="/residentes"
                    component={ ResidentesScreen }
                />
                <Route 
                    exact path="/calendario"
                    component={ CalendarioScreen }
                />
            </Switch>
        </Router>
    )
}
