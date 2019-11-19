import {
    DATA_FETCH_START,
    DATA_FETCH_SUCCESS,
    DATA_FETCH_FAILED,
    ADD_NEW_LIST,
    REMOVE_LIST,
    ADD_NEW_TASK,
    TASK_EDIT_START,
    TASK_EDIT_SUCCESS,
    TASK_EDIT_FAILED,
    REMOVE_TASK,
    MARK_TASK_EDITABLE,
    MARK_TASK_NOT_EDITABLE,
    TASK_ADD_POPUP_SHOW,
    TASK_ADD_POPUP_HIDE,
    TASK_EDIT_POPUP_SHOW,
    TASK_EDIT_POPUP_HIDE,
    ADD_NEW_LIST_POPUP_SHOW,
    ADD_NEW_LIST_POPUP_HIDE,
    MARK_LIST_EDITABLE,
    MARK_LIST_NOT_EDITABLE
} from './constants';

import { requestMaker } from '../../helpers/requestMaker';
import { normalize, schema } from "normalizr";

export const getTasksFetch = () => dispatch => {
    dispatch({ type: DATA_FETCH_START });

    requestMaker('lists/', 'get')
        .then((response) => response.data)
        .then(({ message, ...data }) => {
            if (message) {
                throw new Error(message);
            } else {
                const user = new schema.Entity('users');
                const task = new schema.Entity('tasks', {
                    assigns: [user]
                });
                const list = new schema.Entity('lists', {
                    tasks: [task]
                });
                const normalizedData = normalize(data, { lists: [list] });
                dispatch({
                    type: DATA_FETCH_SUCCESS,
                    payload: normalizedData.entities
                });
            }
        })
};

export const addList = (data) => dispatch => {
    return requestMaker('lists/create', 'post', data)
        .then((response) => response.data)
        .then(({ message, ...data }) => {
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

export const deleteListRequest = (id) => dispatch => {
    return requestMaker('lists/delete', 'post', { id })
                .then(({ message }) => {
                    if (message) {
                        throw new Error('Problem with list deleting');
                    } else {
                        dispatch(deleteList(id));
                    }
                });
};

export const addTaskRequest = (data) => dispatch => {
    return requestMaker('tasks/add', 'post', data)
        .then((response) => response.data)
        .then(({ message, ...data }) => {
            debugger;
            if (message) {
                throw new Error('Problem with list deleting');
            } else {
                dispatch(addTask(data));
            }
        });
};

export const editTaskRequest = (data) => dispatch => {
    dispatch({ type: TASK_EDIT_START });
    return requestMaker('tasks/edit', 'post', data)
            .then((response) => response.data)
            .then(({ message, ...data }) => {
                if (message) {
                    dispatch({ type: TASK_EDIT_FAILED, payload: { message } });
                    throw new Error('Problem with list deleting');
                } else {
                    // dispatch({
                    //     type: DATA_FETCH_SUCCESS,
                    //     payload: normalizedData.entities
                    // });
                    dispatch(editTask(data));
                }
            });
};

const deleteList = (id) => ({
    type: REMOVE_LIST,
    payload: {
        id
    }
});

export const addTask = (data) => ({
    type: ADD_NEW_TASK,
    payload: {
        data
    }
});

export const editTask = (data) => ({
    type: TASK_EDIT_SUCCESS,
    payload: {
        data
    }
});

export const removeTask = (id) => ({
    type: REMOVE_TASK,
    payload: {
        id
    }
});

export const markListEditable = (id) => ({
    type: MARK_LIST_EDITABLE,
    payload: {
        id
    }
});

export const markListNotEditable = (id) => ({
    type: MARK_LIST_NOT_EDITABLE,
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

export const markTaskNotEditable = (id) => ({
    type: MARK_TASK_NOT_EDITABLE,
    payload: {
        id
    }
});

export const showAddTaskPopup = () => ({
    type: TASK_ADD_POPUP_SHOW
});

export const hideAddTaskPopup = () => ({
    type: TASK_ADD_POPUP_HIDE
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
