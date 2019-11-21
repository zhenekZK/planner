import {
    DATA_FETCH_START,
    DATA_FETCH_SUCCESS,
    DATA_FETCH_FAILED,
    LIST_ADD_START,
    LIST_ADD_SUCCESS,
    LIST_ADD_FAILED,
    LIST_REMOVE_START,
    LIST_REMOVE_SUCCESS,
    LIST_REMOVE_FAILED,
    TASK_ADD_START,
    TASK_ADD_SUCCESS,
    TASK_ADD_FAILED,
    TASK_EDIT_START,
    TASK_EDIT_SUCCESS,
    TASK_EDIT_FAILED,
    TASK_REMOVE_START,
    TASK_REMOVE_SUCCESS,
    TASK_REMOVE_FAILED,
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

export const getListsFetch = () => dispatch => {
    dispatch({ type: DATA_FETCH_START });

    requestMaker('lists/', 'get')
        .then((response) => response.data)
        .then(({ message, ...data }) => {
            if (message) {
                dispatch({ type: DATA_FETCH_FAILED, error: message });
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
    dispatch({ type: LIST_ADD_START });

    return requestMaker('lists/create', 'post', data)
        .then((response) => response.data)
        .then(({ message, ...data }) => {
            if (message) {
                dispatch({ type: LIST_ADD_FAILED, error: message });
                throw new Error('Problem with list adding');
            } else {
                dispatch({
                    type: LIST_ADD_SUCCESS,
                    payload: {
                        ...data
                    }
                });
            }
        })
};

export const deleteListRequest = (id) => dispatch => {
    dispatch({ type: LIST_REMOVE_START });

    return requestMaker('lists/delete', 'post', { id })
            .then(({ message }) => {
                if (message) {
                    dispatch({ type: LIST_REMOVE_FAILED, error: message });
                    throw new Error('Problem with list deleting');
                } else {
                    dispatch(deleteList(id));
                }
            });
};

export const addTaskRequest = (data) => dispatch => {
    dispatch({ type: TASK_ADD_START });

    return requestMaker('tasks/create', 'post', data)
        .then((response) => response.data)
        .then(({ message, ...data }) => {
            if (message) {
                dispatch({ TASK_ADD_FAILED, error: message });
                throw new Error('Problem with list deleting');
            } else {
                dispatch(addTask(data));
            }
        });
};

export const editTaskRequest = (data) => dispatch => {
    dispatch({ type: TASK_EDIT_START });

    debugger;

    return requestMaker('tasks/edit', 'post', data)
            .then((response) => response.data)
            .then(({ message, ...data }) => {
                if (message) {
                    dispatch({ type: TASK_EDIT_FAILED, payload: { message } });
                    throw new Error('Problem with list deleting');
                } else {
                    dispatch(editTask(data));
                }
            });
};

export const removeTaskRequest = (id) => dispatch => {
    dispatch({ type: TASK_REMOVE_START });

    return requestMaker('tasks/delete', 'post', { id })
        .then((response) => response.data)
        .then(({ message, id }) => {
            if (message) {
                dispatch({ type: TASK_REMOVE_FAILED, payload: { message } });
                throw new Error('Problem with task deleting');
            } else {
                dispatch(removeTask(id));
            }
        });
};

const deleteList = (id) => ({
    type: LIST_REMOVE_SUCCESS,
    payload: {
        id
    }
});

export const addTask = (data) => ({
    type: TASK_ADD_SUCCESS,
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
    type: TASK_REMOVE_SUCCESS,
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
