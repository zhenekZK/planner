import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DashboardContainer from './Dashboard/DashboardContainer';
import LoginPageContainer from './LoginPage/LoginPageContainer';
import RegisterPageContainer from './RegisterPage/RegisterPageContainer';
import { PrivateRoute } from './helpers/PrivateRoute';

export const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/login" component={LoginPageContainer} />
                <Route path="/signup" component={RegisterPageContainer} />
                <PrivateRoute exact path='/dashboard' component={DashboardContainer} />
                <Redirect from="*" to="/dashboard" />
            </Switch>
        </Router>
    );
}

export default App;
