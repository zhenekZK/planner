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
    return axios.post('http://localhost:4000/user/create', qs.stringify(data))
        .then((response) => response.data.user)
        .then(user => {
            if (user.token) {
                dispatch(loginUser(user))
            } else {
                throw new Error('Problem with login');
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
                dispatch(loginUser(data));
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

export const loginUser = user => {
    localStorage.setItem("token", user.token);

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
