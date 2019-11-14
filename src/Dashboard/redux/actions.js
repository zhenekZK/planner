import {
    ADD_NEW_LIST,
    REMOVE_LIST,
    ADD_NEW_TASK,
    EDIT_TASK,
    REMOVE_TASK,
    MARK_TASK_EDITABLE,
    MARK_TASKS_NOT_EDITABLE,
    TASK_EDIT_POPUP_SHOW,
    TASK_EDIT_POPUP_HIDE,
    ADD_NEW_LIST_POPUP_SHOW,
    ADD_NEW_LIST_POPUP_HIDE
} from './constants';

import axios from "axios";
import qs from "qs";

export const addList = (title) => dispatch => {
    const token = localStorage.token;
    return axios.post('http://localhost:4000/lists/create', qs.stringify(title), {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .then((response) => response.data)
        .then(({message, ...data}) => {
            debugger
            if (message) {
                throw new Error('Problem with list adding');
            } else {
                dispatch({
                    type: ADD_NEW_LIST,
                    payload: {
                        ...data
                    }
                });
            }
        })
};

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

export const editTask = (data) => ({
    type: EDIT_TASK,
    payload: { ...data }
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

export const markTasksNotEditable = () => ({
    type: MARK_TASKS_NOT_EDITABLE
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

