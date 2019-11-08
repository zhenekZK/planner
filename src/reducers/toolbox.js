import {
    ADD_NEW_LIST_POPUP_SHOW,
    ADD_NEW_LIST_POPUP_HIDE
} from '../Dashboard/redux/actions';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_NEW_LIST_POPUP_SHOW:
            console.log('Add list popup SHOW');
            return {
                ...state,
                showAddListPopup: true
            };
        case ADD_NEW_LIST_POPUP_HIDE:
            console.log('Add list popup HIDE');
            return {
                ...state,
                showAddListPopup: false
            };
        default:
            return state
    }
}
