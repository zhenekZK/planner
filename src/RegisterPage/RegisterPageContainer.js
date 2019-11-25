import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import RegisterPage from "./RegisterPage";

import { userPostFetch } from "../Authorization/redux/actions";
import { selectIsAuthenticated } from "../Authorization/redux/reducers/authentication";
import { Redirect } from "react-router-dom";

class RegisterPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            surname: '',
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
        this.props.createUser(data);

        this.setState({
            name: '',
            surname: '',
            email: '',
            password: ''
        });
    };

    render() {
        return (
            this.props.isAuthenticated ?
                <Redirect to='/dashboard' /> :
                <RegisterPage
                    name={this.state.name}
                    surname={this.state.surname}
                    email={this.state.email}
                    password={this.state.password}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                />
        );
    }
}

const mapStateToProps = (state) => ({ isAuthenticated: selectIsAuthenticated(state) });

const mapDispatchToProps = (dispatch) => ({
    createUser: (data) => dispatch(userPostFetch(data))
});

RegisterPageContainer.propTypes = {
    createUser: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPageContainer);
