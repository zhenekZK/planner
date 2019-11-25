import {
    LOGIN_USER_STARTED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER
} from '../constants';

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER_STARTED:
            return state; // will be implemented later
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case LOGIN_USER_FAILED:
            return state; // will be implemented later
        case LOGOUT_USER:
            return {};
        default:
            return state;
    }
}

export const selectCurrentUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => {
    return state.auth.isAuthenticated;
};

export const selectCurrentUserToken = (state) => state.auth.user;
