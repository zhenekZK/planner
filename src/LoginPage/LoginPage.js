import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage(props) {
    const {
        username,
        password,
        handleChange,
        handleSubmit
    } = props;

    return (
        <div className="col-md-6 col-md-offset-3">
            <h2>Login</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" value={username} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Login</button>
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
