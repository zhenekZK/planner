const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
const LOGOUT_USER = 'LOGOUT_USER';

// let user = JSON.parse(localStorage.getItem('token'));
// const initialState = user ? { loggedIn: true, user } : {};

export default function authentication(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            debugger;
            return action.payload;
        case LOGOUT_USER:
            return {};
        default:
            return state;
    }
}
