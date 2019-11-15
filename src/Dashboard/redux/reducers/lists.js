import {
    ADD_NEW_LIST, DATA_FETCH_SUCCESS,
    REMOVE_LIST
} from '../constants';

import { combineReducers } from 'redux';

const listsById = (state = {}, action) => {
    switch (action.type) {
        case DATA_FETCH_SUCCESS:
            console.log(action.payload);
            return {...state, ...action.payload.lists};
        case ADD_NEW_LIST:
            const { id, title } = action.payload;

            return {
                ...state,
                [id]: {
                    id: id,
                    title: title,
                    tasks: []
                }
            };
        case REMOVE_LIST:
            debugger;
            const data = {...state.filter((list => list.id !== action.payload.id))};
            console.log(data);
            return {
                ...state.filter((list => list.id !== action.payload.id))
            };

        default:
            return state
    }
};

const allLists = (state = [], action) => {
    switch (action.type) {
        case DATA_FETCH_SUCCESS:
            console.log(action.payload);
            return [...Object.keys(action.payload.lists).map((key) => parseInt(key))];
        case ADD_NEW_LIST:
            const { id } = action.payload;

            return [
                ...state,
                id
            ];
        case REMOVE_LIST:
            return [
                ...state.filter(listId => listId !== action.payload.id)
            ];
        default:
            return state;
    }
};

export default combineReducers({
    byId: listsById,
    allIds: allLists
});

export const selectListIds = (state) => state.lists.allIds;

export const selectListById = (state, id) => state.lists.byId[id];

export const selectAllLists = (state) => {
    return {
        ...state.lists.byId
    }
};

export const selectAllListsAsArray = (state) => {
    return selectListIds(state).map(id => selectListById(state, id))
};
