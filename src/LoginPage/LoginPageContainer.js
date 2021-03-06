import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";

import LoginPage from './LoginPage';

import { userLoginFetch } from '../Authorization/redux/actions';
import { selectIsAuthenticated } from '../Authorization/redux/reducers/authentication';

class LoginPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const data = this.state;
        this.props.loginUser(data);

        this.setState({
            email: '',
            password: ''
        });
    };

    render() {
        return (
            this.props.isAuthenticated ?
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
        isAuthenticated: selectIsAuthenticated(state)
    }
};

const mapDispatchToProps = (dispatch) => ({
    loginUser: (user) => dispatch(userLoginFetch(user))
});

LoginPageContainer.defaultProps = {
    isLogged: false
};

LoginPageContainer.propTypes = {
    isLogged: PropTypes.bool,
    loginUser: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
