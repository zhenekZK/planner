export const ADD_NEW_LIST = 'ADD_NEW_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const REMOVE_TASK = 'REMOVE_TASK';
export const ADD_NEW_LIST_POPUP_SHOW = 'ADD_NEW_LIST_POPUP_SHOW';
export const ADD_NEW_LIST_POPUP_HIDE = 'ADD_NEW_LIST_POPUP_HIDE';

export const addList = ({ title }) => ({
    type: ADD_NEW_LIST,
    payload: {
        title
    }
});

export const removeList = (id) => ({
    type: REMOVE_LIST,
    payload: {
        id
    }
});

export const removeTask = (id) => ({
    type: REMOVE_TASK,
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

