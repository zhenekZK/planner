import {
    ADD_NEW_LIST,
    REMOVE_LIST
} from '../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_NEW_LIST:
            const { id, title } = action.payload;

            return {
                ...state,
                allIds: [
                    ...state.allIds,
                    id
                ],
                byId: {
                    ...state.byId,
                    [id]: {
                        id: id,
                        title: title,
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
