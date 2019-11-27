import {
    TASK_ADD_SUCCESS,
    TASK_REMOVE_SUCCESS,
    DATA_FETCH_SUCCESS,
    TASK_EDIT_SUCCESS
} from '../constants';
import { combineReducers } from "redux";

const tasksById = (state = {}, action) => {
    switch (action.type) {
        case DATA_FETCH_SUCCESS:
            return { ...action.payload.tasks };
        case TASK_ADD_SUCCESS:
            return {
                ...state,
                [action.payload.data.id]: {
                    ...action.payload.data
                }
            };
        case TASK_EDIT_SUCCESS:
            return {
                ...state,
                [action.payload.data.id]: {
                    ...action.payload.data
                }
            };
        case TASK_REMOVE_SUCCESS:
            return {
                ...state,
                ...Object.keys(state)
                    .filter(key => action.payload.id !== parseInt(key))
                    .reduce((obj, key) => {
                        obj[key] = state[key];
                        return obj;
                    }, {})
            };
        default:
            return state;
    }
};

const allTasks = (state = [], action) => {
    switch (action.type) {
        case DATA_FETCH_SUCCESS:
            return [...Object.keys(action.payload.tasks).map((key) => parseInt(key))];
        case TASK_ADD_SUCCESS:
            return [
                ...state,
                action.payload.data.id
            ];
        case TASK_REMOVE_SUCCESS:
            const newIds = [...state.filter((id) => {
                return action.payload.id !== id
            })];
            return [
                ...newIds
            ];
        default:
            return state;
    }
};

export default combineReducers({
    byId: tasksById,
    allIds: allTasks
});
