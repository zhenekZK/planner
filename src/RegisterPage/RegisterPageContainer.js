import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

import RegisterPage from "./RegisterPage";

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
        axios.post('http://localhost:4000/signup', qs.stringify(data)).then((response) => console.log(response));
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

export default connect(null, null)(RegisterPageContainer);
