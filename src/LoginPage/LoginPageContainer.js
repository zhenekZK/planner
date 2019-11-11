import React from 'react';
import { connect } from 'react-redux';

import LoginPage from "./LoginPage";

class LoginPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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
                email={this.state.email}
                password={this.state.password}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}

export default connect(null, null)(LoginPageContainer);
