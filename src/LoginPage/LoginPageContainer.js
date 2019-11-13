import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginPage from './LoginPage';
import { userLoginFetch } from '../Authorization/redux/actions';

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

        const username = this.state.email;
        const password = this.state.password;

        const data = { username, password };
        this.props.loginUser(data);
    };

    render() {
        return (
            this.props.isLogged ?
                <Redirect to='/dashboard' /> :
                <LoginPage
                    email={this.state.email}
                    password={this.state.password}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: !!state.currentUser.token
    }
};

const mapDispatchToProps = (dispatch) => ({
    loginUser: (user) => dispatch(userLoginFetch(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
