import React from 'react';
import { connect } from 'react-redux';

import LoginPage from "./LoginPage";

// import { userActions } from '../_actions';

class LoginPageContainer extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    };

    render() {
        return (
            <LoginPage
                loggingIn={this.props.loggingIn}
                username={this.state.username}
                password={this.state.password}
                submitted={this.state.submitted}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}

export default connect(null, null)(LoginPageContainer);
