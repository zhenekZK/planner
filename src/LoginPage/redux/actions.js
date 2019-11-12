import axios from "axios";
import qs from "qs";

export const userLoginFetch  = user => {
    return dispatch => {
        axios.post('http://localhost:4000/signin', qs.stringify(user))
            .then((response) => {
                debugger;
                return response.data
            }
            )
            .then(user => {
                debugger;
                if (user.token) {
                    localStorage.setItem("token", user.token);
                    dispatch(loginUser(user))
                } else {
                    throw new Error('Problem with login');
                }
            })
    }
};

export const loginUser = user => ({
    type: 'LOGIN_USER_SUCCESS',
    payload: user
});
