export const ADD_NEW_LIST = 'ADD_NEW_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const MARK_TASK_EDITABLE = 'MARK_TASK_EDITABLE';
export const REMOVE_TASK = 'REMOVE_TASK';
export const ADD_NEW_LIST_POPUP_SHOW = 'ADD_NEW_LIST_POPUP_SHOW';
export const ADD_NEW_LIST_POPUP_HIDE = 'ADD_NEW_LIST_POPUP_HIDE';
export const TASK_EDIT_POPUP_SHOW = 'TASK_EDIT_POPUP_SHOW';
export const TASK_EDIT_POPUP_HIDE = 'TASK_EDIT_POPUP_HIDE';

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

export const addTask = () => ({
    type: ADD_NEW_TASK,
    payload: {

    }
});

export const removeTask = (id) => ({
    type: REMOVE_TASK,
    payload: {
        id
    }
});

export const markTaskEditable = (id) => ({
    type: MARK_TASK_EDITABLE,
    payload: {
        id
    }
});

export const showEditTaskPopup = () => ({
    type: TASK_EDIT_POPUP_SHOW
});

export const hideEditTaskPopup = () => ({
    type: TASK_EDIT_POPUP_HIDE
});

export const showAddListPopup = () => ({
    type: ADD_NEW_LIST_POPUP_SHOW
});

export const hideAddListPopup = () => ({
    type: ADD_NEW_LIST_POPUP_HIDE
});

