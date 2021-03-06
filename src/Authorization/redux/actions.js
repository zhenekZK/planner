import axios from "axios";
import qs from "qs";
import { requestMaker } from "../../helpers/requestMaker";

import {
    LOGIN_USER_STARTED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER
} from './constants';

export const userPostFetch = data => dispatch => {
    return axios.post('http://localhost:4000/user/register', qs.stringify(data))
        .then((response) =>  response.data)
        .then(({ message, ...user }) => {
            debugger;
            if (user.token) {
                dispatch(loginUser(user))
            } else {
                throw new Error('Problem with registration');
            }
        })
};

export const userLoginFetch  = user => dispatch => {
    dispatch(loginUserStarted());

    axios.post('http://localhost:4000/user/login', qs.stringify(user))
        .then((response) =>  response.data)
        .then(({ message, ...user }) => {
            if (user.token) {
                dispatch(loginUser(user))
            } else {
                throw new Error('Problem with login');
            }
        })
};

export const getProfileFetch = () => dispatch => {
    requestMaker('user/profile', 'get')
        .then((response) => response.data)
        .then(({ message, ...data}) => {
            if (message) {
                dispatch(loginUserFailed(message));
            } else {
                let token = localStorage.getItem('token');
                dispatch(loginUser({ ...data, token }));
            }
        }
    )
};

export const loginUserStarted = () => ({
    type: LOGIN_USER_STARTED
});

export const loginUserFailed = (message) => {
    localStorage.removeItem("token");

    return {
        type: LOGIN_USER_FAILED,
        payload: {
            error: message
        }
    }
};

export const loginUser = ({ token, ...user }) => {
    localStorage.setItem('token', token);

    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            ...user
        }
    };
};

export const logoutUser = function () {
    localStorage.removeItem("token");

    return {
        type: LOGOUT_USER
    };
};
