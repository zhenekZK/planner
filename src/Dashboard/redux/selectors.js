export const selectListIds = (state) => state.lists.allIds;

export const selectListById = (state, id) => state.lists.byId[id];

export const selectAllLists = (state) => {
    return {
        ...state.lists.byId
    }
};

export const selectEditableListId = (state) => {
    let id = null;
    const ids = selectListIds(state);

    for (let i = 0, length = ids.length; i < length; i++) {
        if (selectListById(state, ids[i]).isEditable) {
            id = ids[i];
            break;
        }
    }

    return id;
};

export const selectAllListsAsArray = (state) => {
    return selectListIds(state).map(id => selectListById(state, id))
};

export const selectTaskIds = (state) => {
    return state.tasks.allIds;
};

export const selectTaskById = (state, id) => {
    return state.tasks.byId[id];
};

export const selectAssignsByTaskId = (state, id) => {
    return id ? selectTaskById(state, id).assigns : [];
};

export const selectAssignsDataByTaskId = (state, id) => {
    return selectAssignsByTaskId(state, id).map((userId => {
            const user = selectUserById(state, userId);

            return {
                value: user.id,
                label: `${user.name} ${user.surname}`
            }
        }
    ))
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

export const selectAllUsers = (state) => {
    return {
        ...state.users.byId
    }
};

export const selectUserIds = (state) => state.users.allIds;

export const selectAllUsersAsArray = (state) => {
    return selectUserIds(state).map(id => selectUserById(state, id))
};

export const selectUserNames = (state, ids = []) => { // [] - temporary stub
    return ids.map(id => {
        let user = selectUserById(state, id);
        return user ? user.name : 'Error';
    });
};

export const selectUserById = (state, id) => {
    return state.users.byId[id];
};

export const selectUserNameById = (state, id) => {
    return selectUserById(state, id).name;
};

export const selectAddListPopupIsShowing = (state) => state.toolbox.showAddListPopup;

export const selectTaskAddPopupIsShowing = (state) => state.toolbox.showTaskAddPopup;

export const selectTaskEditPopupIsShowing = (state) => state.toolbox.showTaskEditPopup;
