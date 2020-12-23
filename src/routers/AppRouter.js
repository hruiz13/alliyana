import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { AlliyanaScreen } from '../components/alliyana/AlliyanaScreen';

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route 
                    exact path="/"
                    component={ AlliyanaScreen }
                />
            </Switch>
        </Router>
    )
}
