import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DashboardContainer from './Dashboard/DashboardContainer';
import LoginPageContainer from './LoginPage/LoginPageContainer';

export const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/login" component={LoginPageContainer} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    );
}

export default App;
