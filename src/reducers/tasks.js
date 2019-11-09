import {
    ADD_NEW_TASK,
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
        case REMOVE_TASK:
            // console.log(action.payload);
            // console.log(state, 'OLD STATE');
            const newIds = [...state.allIds.filter((id) => action.payload.id !== id)];
            // var newState = {
            //     ...state,
            //     allIds: [
            //         ...newIds
            //     ],
            //     byId: {
            //         ...Object.keys(state.byId)
            //             .filter(key => newIds.includes(key))
            //             .reduce((obj, key) => {
            //                 obj[key] = state.byId[key];
            //                 return obj;
            //             }, {})
            //     }
            // };
            //
            // console.log(newState, 'NEW STATE');
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
