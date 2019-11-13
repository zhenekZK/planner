import {
    ADD_NEW_LIST,
    REMOVE_LIST
} from '../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_NEW_LIST:
            return {
                ...state,
                allIds: [
                    ...state.allIds,
                    '' + state.allIds.length
                ],
                byId: {
                    ...state.byId,
                    ['' + state.allIds.length]: {
                        id: state.allIds.length,
                        title: action.payload.title,
                        tasks: []
                    }
                }
            };
        case REMOVE_LIST:
            return state; // will implement later

        default:
            return state
    }
}

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
