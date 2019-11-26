import {
    ADD_NEW_LIST_POPUP_SHOW,
    ADD_NEW_LIST_POPUP_HIDE,
    TASK_ADD_POPUP_SHOW,
    TASK_ADD_POPUP_HIDE,
    TASK_EDIT_POPUP_SHOW,
    TASK_EDIT_POPUP_HIDE
} from '../constants';

const initialState = {
    showAddListPopup: false,
    showTaskAddPopup: false,
    showTaskEditPopup: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        //active List : id
        case ADD_NEW_LIST_POPUP_SHOW:
            return {
                ...state,
                showAddListPopup: true
            };
        case ADD_NEW_LIST_POPUP_HIDE:
            return {
                ...state,
                showAddListPopup: false
            };
        case TASK_ADD_POPUP_SHOW:
            return {
                ...state,
                showTaskAddPopup: true
            };
        case TASK_ADD_POPUP_HIDE:
            return {
                ...state,
                showTaskAddPopup: false
            };
        case TASK_EDIT_POPUP_SHOW:
            return {
                ...state,
                showTaskEditPopup: true
            };
        case TASK_EDIT_POPUP_HIDE:
            return {
                ...state,
                showTaskEditPopup: false
            };
        default:
            return state
    }
}
