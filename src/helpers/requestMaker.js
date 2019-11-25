import axios from "axios";
import qs from "qs";

export const requestMaker = (address, type, data) => {
    const token = localStorage.token;
    const extraData = {
        headers: {
            Authorization: token
        }
    };

    switch (type) {
        case 'get':
            return axios.get('http://localhost:4000/' + address, extraData);
        case 'post':
            return axios.post('http://localhost:4000/' + address, qs.stringify(data), extraData);
        default:
            return axios.get('http://localhost:4000/');
    }
};
