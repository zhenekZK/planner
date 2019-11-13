import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER
} from '../constants';

export default function authentication(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            debugger;
            return action.payload;
        case LOGIN_USER_FAILED:
            return state; // will be implemented later
        case LOGOUT_USER:
            return {};
        default:
            return state;
    }
}
