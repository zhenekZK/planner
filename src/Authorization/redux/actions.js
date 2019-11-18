import {
    LOGIN_USER_STARTED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER
} from './constants';

import axios from "axios";
import qs from "qs";
import { requestMaker } from "../../helpers/requestMaker";

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
    dispatch({ type: LOGIN_USER_STARTED });

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
    requestMaker('user/profile', 'get')
        .then((response) => response.data)
        .then((data) => {
            if (data.message) {
                localStorage.removeItem("token");
                dispatch({
                    type: LOGIN_USER_FAILED,
                    payload: { message: data.message }
                });
                console.error(data.message, '!!!!');
            } else {
                dispatch(loginUser(data));
            }
        }
    )
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
