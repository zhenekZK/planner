import {
    ADD_NEW_TASK, DATA_FETCH_SUCCESS,
    TASK_EDIT_START,
    TASK_EDIT_SUCCESS,
    TASK_EDIT_FAILED,
    MARK_TASK_EDITABLE,
    MARK_TASK_NOT_EDITABLE,
    REMOVE_TASK
} from '../constants';
import {combineReducers} from "redux";

const tasksById = (state = {}, action) => {
    switch (action.type) {
        case DATA_FETCH_SUCCESS:
            return { ...action.payload.tasks };
        case ADD_NEW_TASK:
            const { id, ...data } = action.payload.data;
            debugger;
            return {
                ...state,
                [id]: {
                    id,
                    ...data
                }
            };
        case MARK_TASK_EDITABLE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    isEditable: true
                }
            };
        case MARK_TASK_NOT_EDITABLE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    isEditable: false
                }
            };
        case TASK_EDIT_SUCCESS:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    title: action.payload.title,
                    priority: action.payload.priority,
                    description: action.payload.description,
                    status: action.payload.status,
                    list: action.payload.list
                }
            };
        case REMOVE_TASK:
            return {
                ...state,
                ...Object.keys(state)
                    .filter(key => action.payload.id !== parseInt(key))
                    .reduce((obj, key) => {
                        obj[key] = state[key];
                        return obj;
                    }, {})
            };
        default:
            return state;
    }
};

const allTasks = (state = [], action) => {
    switch (action.type) {
        case DATA_FETCH_SUCCESS:
            return [...Object.keys(action.payload.tasks).map((key) => parseInt(key))];
        case ADD_NEW_TASK:
            return [
                ...state,
                action.payload.data.id
            ];
        case REMOVE_TASK:
            const newIds = [...state.filter((id) => {
                return action.payload.id !== id
            })];
            return [
                ...newIds
            ];
        default:
            return state;
    }
};

export default combineReducers({
    byId: tasksById,
    allIds: allTasks
});

export const selectTaskIds = (state) => {
    return state.tasks.allIds;
};

export const selectTaskById = (state, id) => {
    return state.tasks.byId[id];
};

export const selectTasksByListId = (state, id) => {
    const ids = selectTaskIds(state);
    const fitIds = ids.filter(taskId => {
        return selectTaskById(state, taskId).list_id === id
    });

    return fitIds.map(taskId => selectTaskById(state, taskId));
};

export const selectEditableTaskId = (state) => {
    let editableTaskId = null,
        taskIds = selectTaskIds(state);

    for (let i = 0, length = taskIds.length; i < length; i++){
        let taskInfo = selectTaskById(state, taskIds[i]);

        if (taskInfo.isEditable) {
            editableTaskId = taskInfo.id;
            break;
        }
    }

    return editableTaskId;
};
