import {
    ADD_NEW_TASK,
    EDIT_TASK,
    MARK_TASK_EDITABLE,
    MARK_TASKS_NOT_EDITABLE,
    REMOVE_TASK
} from "../Dashboard/redux/actions";

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_NEW_TASK:
            return state;
        case MARK_TASK_EDITABLE:
            return {
                ...state,
                isEdited: action.payload.id
            };
        case MARK_TASKS_NOT_EDITABLE:
            return {
                ...state,
                isEdited: null
            };
        case EDIT_TASK:
            debugger;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [state.isEdited]: {
                        ...state.byId[state.isEdited],
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
