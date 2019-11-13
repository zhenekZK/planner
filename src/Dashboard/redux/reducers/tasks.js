import { createSelector } from 'reselect';

import {
    ADD_NEW_TASK,
    EDIT_TASK,
    MARK_TASK_EDITABLE,
    MARK_TASKS_NOT_EDITABLE,
    REMOVE_TASK
} from '../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_NEW_TASK:
            return state;
        case MARK_TASK_EDITABLE:
            return {
                ...state,
                isEditable: action.payload.id
            };
        case MARK_TASKS_NOT_EDITABLE:
            return {
                ...state,
                isEditable: null
            };
        case EDIT_TASK:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [state.isEditable]: {
                        ...state.byId[state.isEditable],
                        title: action.payload.title,
                        priority: action.payload.priority,
                        description: action.payload.description,
                        status: action.payload.status,
                        list: action.payload.list
                    }
                }
            };
        case REMOVE_TASK:
            const newIds = [...state.allIds.filter((id) => action.payload.id !== id)];
            return {
                ...state,
                allIds: [
                    ...newIds
                ],
                byId: {
                    ...Object.keys(state.byId)
                        .filter(key => action.payload.id !== key)
                        .reduce((obj, key) => {
                            obj[key] = state.byId[key];
                            return obj;
                        }, {})
                }
            };
        default:
            return state;
    }
}

export const selectTaskIds = (state) => {
    return state.tasks.allIds;
};

export const selectTaskById = (state, id) => {
    return state.tasks.byId[id];
};

export const selectTasksByListId = (state, id) => {
    const ids = selectTaskIds(state);

    const fitIds = ids.filter(taskId => {
        return selectTaskById(state, taskId).list === id
    });

    return fitIds.map(taskId => selectTaskById(state, taskId));
};

export const selectEditableTaskId = (state) => state.tasks.isEditable;
