import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DashboardContainer from './Dashboard/DashboardContainer';
import LoginPageContainer from './LoginPage/LoginPageContainer';
import RegisterPageContainer from './RegisterPage/RegisterPageContainer';

export const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/login" component={LoginPageContainer} />
                <Route path="/signup" component={RegisterPageContainer} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    );
}

export default App;
