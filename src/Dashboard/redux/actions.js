export const ADD_NEW_LIST = 'ADD_NEW_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const ADD_NEW_LIST_POPUP_SHOW = 'ADD_NEW_LIST_POPUP_SHOW';
export const ADD_NEW_LIST_POPUP_HIDE = 'ADD_NEW_LIST_POPUP_HIDE';

export const addList = ({ title }) => ({
    type: ADD_NEW_LIST,
    payload: {
        title
    }
});

export const deleteList = (id) => ({
    type: DELETE_LIST,
    payload: {
        id
    }
});

export const showAddListPopup = () => ({
    type: ADD_NEW_LIST_POPUP_SHOW
});

export const hideAddListPopup = () => ({
    type: ADD_NEW_LIST_POPUP_HIDE
});

