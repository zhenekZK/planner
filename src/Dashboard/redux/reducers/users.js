import { DATA_FETCH_SUCCESS, USERS_WERE_UPDATED } from "../constants";
import { combineReducers } from "redux";
import produce from 'immer';

const usersById = (state = {}, action) => {
    switch (action.type) {
        case DATA_FETCH_SUCCESS:
            return {...state, ...action.payload.users};
        case USERS_WERE_UPDATED:
            return produce(state, draft => {
                const ids = Object.keys(action.payload.data);

                ids.forEach((id) => {
                    draft[parseInt(id)] = action.payload.data[id];
                });
            });
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
