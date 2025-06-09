import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Pacientes from '../pages/Pacientes';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <ProtectedRoute path="/pacientes" component={Pacientes} />
            </Switch>
        </Router>
    );
};

export default AppRouter;
