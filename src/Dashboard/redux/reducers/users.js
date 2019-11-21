import { DATA_FETCH_SUCCESS, REMOVE_LIST} from "../constants";
import { combineReducers } from "redux";

const usersById = (state = {}, action) => {
    switch (action.type) {
        case DATA_FETCH_SUCCESS:
            return {...state, ...action.payload.users};
        default:
            return state
    }
};

const allUsers = (state = [], action) => {
    switch (action.type) {
        case DATA_FETCH_SUCCESS:
            return [...Object.keys(action.payload.users).map((key) => parseInt(key))];
        default:
            return state;
    }
};

export default combineReducers({
    byId: usersById,
    allIds: allUsers
});
