import {
    ADD_NEW_LIST,
    ADD_NEW_TASK,
    DATA_FETCH_SUCCESS,
    MARK_LIST_EDITABLE,
    MARK_LIST_NOT_EDITABLE,
    REMOVE_LIST
} from '../constants';

import { combineReducers } from 'redux';

const listsById = (state = {}, action) => {
    switch (action.type) {
        case DATA_FETCH_SUCCESS:
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
        case ADD_NEW_TASK:
            const { list_id } = action.payload.data;
            debugger;
            return {
                ...state,
                [list_id]: {
                    ...state[list_id],
                    tasks: [
                        ...state[list_id].tasks,
                        action.payload.id
                    ]
                }
            };
        case REMOVE_LIST:
            const { [action.payload.id]: value, ...result } = state;
            return {
                ...result
            };
        case MARK_LIST_EDITABLE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    isEditable: true,
                }
            };
        case MARK_LIST_NOT_EDITABLE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    isEditable: false,
                }
            };
        default:
            return state
    }
};

const allLists = (state = [], action) => {
    switch (action.type) {
        case DATA_FETCH_SUCCESS:
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

export const selectEditableListId = (state) => {
    let id = null;
    const ids = selectListIds(state);

    for (let i = 0, length = ids.length; i < length; i++) {
        if (selectListById(state, ids[i]).isEditable) {
            id = ids[i];
            break;
        }
    }

    return id;
};

export const selectAllListsAsArray = (state) => {
    return selectListIds(state).map(id => selectListById(state, id))
};
