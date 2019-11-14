import {
    LOGIN_USER_SUCCESS,
    LOGOUT_USER
} from './constants';

import axios from "axios";
import qs from "qs";

export const userPostFetch = data => dispatch => {
    return axios.post('http://localhost:4000/user/create', qs.stringify(data))
        .then((response) => response.data.user)
        .then(user => {
            if (user.token) {
                localStorage.setItem("token", user.token);
                dispatch(loginUser(user))
            } else {
                throw new Error('Problem with login');
            }
        })
};

export const userLoginFetch  = user => dispatch => {
    axios.post('http://localhost:4000/user/login', qs.stringify(user))
        .then((response) => {
                return response.data
            }
        )
        .then(user => {
            if (user.token) {
                localStorage.setItem("token", user.token);
                dispatch(loginUser(user))
            } else {
                throw new Error('Problem with login');
            }
        })
};

export const getProfileFetch = () => dispatch => {
    const token = localStorage.token;
    if (token) {
        axios.get('http://localhost:4000/user/profile', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.data)
            .then((data) => {
                if (data.message) {
                    localStorage.removeItem("token");
                    console.error(data.message, '!!!!');
                } else {
                    dispatch(loginUser(data));
                }
            }
        )
    }
};

export const loginUser = user => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
});

export const logoutUser = () => {
    localStorage.removeItem("token");

    return {
        type: LOGOUT_USER
    };
};
