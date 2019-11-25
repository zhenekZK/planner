import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DashboardContainer from './Dashboard/DashboardContainer';
import LoginPageContainer from './LoginPage/LoginPageContainer';
import RegisterPageContainer from './RegisterPage/RegisterPageContainer';
import PrivateRoute from './helpers/PrivateRoute';
import { getProfileFetch } from './Authorization/redux/actions'

export const history = createBrowserHistory();

class App extends Component {
    componentDidMount = () => {
        this.props.getProfile();
    };

    render() {
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
}

const mapDispatchToProps = dispatch => ({
    getProfile: () => dispatch(getProfileFetch())
});

export default connect(null, mapDispatchToProps)(App);
