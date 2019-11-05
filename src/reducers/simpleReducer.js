export default (state = {}, action) => {
    switch (action.type) {
        case 'SIMPLE_ACTION':
            return {
                list: action.payload
            };
        default:
            return state
    }
}
