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

export const selectAllUsers = (state) => {
    return {
        ...state.users.byId
    }
};

export const selectUserIds = (state) => state.users.allIds;

export const selectAllUsersAsArray = (state) => {
    return selectUserIds(state).map(id => selectUserById(state, id))
};

export const selectUserNames = (state, ids = []) => { // [] - temporary stub
    return ids.map(id => state.users.byId[id].name);
};

export const selectUserById = (state, id) => {
    return state.users.byId[id];
};

export const selectUserNameById = (state, id) => {
    return selectUserById(state, id).name;
};
