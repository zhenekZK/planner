import React from 'react';
import { connect } from 'react-redux';

import RegisterPage from "./RegisterPage";
import { userPostFetch } from "../Authorization/redux/actions";

class RegisterPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            lastname: '',
            email: '',
            password: ''
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const data = this.state;
        this.props.createUser(data);
    };

    render() {
        return (
            <RegisterPage
                username={this.state.username}
                lastname={this.state.lastname}
                email={this.state.email}
                password={this.state.password}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    createUser: (data) => dispatch(userPostFetch(data))
});

export default connect(null, mapDispatchToProps)(RegisterPageContainer);
