
export default (state = {}, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export const selectUserInfoById = (state, id) => {
    return state.users.byId[id];
};

export const selectUserNameById = (state, id) => {
    return selectUserInfoById(state, id).name;
};
