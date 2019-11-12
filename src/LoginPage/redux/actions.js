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

export const getProfileFetch = () => {
    return dispatch => {
        const token = localStorage.token;
        debugger;
        if (token) {
            axios.get('http://localhost:4000/profile', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {
                        debugger;
                        return response.data
                    }
                )
            // return fetch("http://localhost:4000/profile", {
            //     method: "GET",
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Accept: 'application/json',
            //         'Authorization': `Bearer ${token}`
            //     }
            // }).then(resp => resp.json())
            //     .then(data => {
            //         if (data.message) {
            //             // An error will occur if the token is invalid.
            //             // If this happens, you may want to remove the invalid token.
            //             localStorage.removeItem("token")
            //         } else {
            //             dispatch(loginUser(data.user))
            //         }
            //     })
        }
    }
};

export const loginUser = user => ({
    type: 'LOGIN_USER_SUCCESS',
    payload: user
});
