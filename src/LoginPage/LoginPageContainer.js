import React from 'react';
import { connect } from 'react-redux';

import LoginPage from './LoginPage';
import { userLoginFetch } from './redux/actions';

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
        console.log(username, password);

        const data = {username, password};
        this.props.loginUser(data);
    };

    render() {
        return (
            <LoginPage
                email={this.state.email}
                password={this.state.password}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: (user) => dispatch(userLoginFetch(user))
});

export default connect(null, mapDispatchToProps)(LoginPageContainer);
