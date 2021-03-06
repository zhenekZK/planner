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
    MARK_TASK_ACTIVE,
    MARK_TASK_NOT_ACTIVE,
    MARK_LIST_ACTIVE,
    MARK_LIST_NOT_ACTIVE,
    USERS_WERE_UPDATED,
    SHOW_MODAL,
    HIDE_MODAL
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
                    assigns: [user],
                    owner: user
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
                const user = new schema.Entity('users');
                const task = new schema.Entity('tasks', {
                    assigns: [user],
                    owner: user
                });

                const normalizedData = normalize(data, task);
                const task_id = normalizedData.result;
                const { users, tasks } = normalizedData.entities;
                const userKeys = users ? Object.keys(users) : [];

                if (userKeys.length) dispatch(usersWereUpdated(users));

                dispatch(addTask(tasks[task_id]));
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
                    const user = new schema.Entity('users');
                    const task = new schema.Entity('tasks', {
                        assigns: [user]
                    });

                    const normalizedData = normalize(data, task);
                    const task_id = normalizedData.result;
                    const { users, tasks } = normalizedData.entities;
                    const userKeys = users ? Object.keys(users) : [];

                    if (userKeys.length) dispatch(usersWereUpdated(users));

                    // after task editting we will always get only one task,
                    // so we can get it due to result value
                    dispatch(editTask(tasks[task_id]));
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

const usersWereUpdated = (users) => ({
    type: USERS_WERE_UPDATED,
    payload: {
        data: users
    }
});

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

export const showModal = (data) => ({
    type: SHOW_MODAL,
    payload: {
        ...data
    }
});

export const hideModal = () => ({
    type: HIDE_MODAL
});

export const markActiveList = (id) => ({
    type: MARK_LIST_ACTIVE,
    payload: {
        id
    }
});

export const removeActiveList = () => ({
    type: MARK_LIST_NOT_ACTIVE
});

export const markActiveTask = (id) => ({
    type: MARK_TASK_ACTIVE,
    payload: {
        id
    }
});

export const removeActiveTask = () => ({
    type: MARK_TASK_NOT_ACTIVE
});
