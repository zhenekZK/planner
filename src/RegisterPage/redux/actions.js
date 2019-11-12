import axios from "axios";
import qs from "qs";
import { loginUser } from '../../LoginPage/redux/actions';

export const userPostFetch = data => {
    return dispatch => {
        return axios.post('http://localhost:4000/signup', qs.stringify(data))
            .then((response) => response.data.user)
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
