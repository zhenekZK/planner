import {
    ADD_NEW_LIST_POPUP_SHOW,
    ADD_NEW_LIST_POPUP_HIDE
} from '../Dashboard/redux/actions';

export default (state = {}, action) => {
    switch (action.type) {
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
        default:
            return state
    }
}
