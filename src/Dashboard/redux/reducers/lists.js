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