import {ADD_NEW_LIST, DATA_FETCH_SUCCESS, REMOVE_LIST} from "../constants";
import {combineReducers} from "redux";

const usersById = (state = {}, action) => {
    switch (action.type) {
        case DATA_FETCH_SUCCESS:
            console.log(action.payload);
            return {...state, ...action.payload.users};
        default:
            return state
    }
};

const allUsers = (state = [], action) => {
    switch (action.type) {
        case DATA_FETCH_SUCCESS:
            console.log(action.payload);
            return [...Object.keys(action.payload.users).map((key) => parseInt(key))];
        default:
            return state;
    }
};

export default combineReducers({
    byId: usersById,
    allIds: allUsers
});

export const selectUserInfoById = (state, id) => {
    return state.users.byId[id];
};

export const selectUserNameById = (state, id) => {
    return selectUserInfoById(state, id).name;
};
