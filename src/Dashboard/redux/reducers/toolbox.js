import {
    MARK_LIST_ACTIVE,
    MARK_LIST_NOT_ACTIVE,
    MARK_TASK_ACTIVE,
    MARK_TASK_NOT_ACTIVE
} from '../constants';

const initialState = {
    activeListId: null,
    activeTaskId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MARK_LIST_ACTIVE:
            return {
                ...state,
                activeListId: action.payload.id
            };
        case MARK_LIST_NOT_ACTIVE:
            return {
                ...state,
                activeListId: null
            };
        case MARK_TASK_ACTIVE:
            return {
                ...state,
                activeTaskId: action.payload.id
            };
        case MARK_TASK_NOT_ACTIVE:
            return {
                ...state,
                activeTaskId: null
            };
        default:
            return state
    }
}
