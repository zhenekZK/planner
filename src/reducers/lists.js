import {
    ADD_NEW_LIST,
    DELETE_LIST
} from '../Dashboard/redux/actions';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_NEW_LIST:
            console.log(ADD_NEW_LIST);
            console.log(action);
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
                        title: action.payload.title
                    }
                }
            };
        case DELETE_LIST:
            return state;

        default:
            return state
    }
}
