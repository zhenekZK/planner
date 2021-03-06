import { combineReducers } from 'redux';
import users from '../Dashboard/redux/reducers/users';
import lists from '../Dashboard/redux/reducers/lists';
import tasks from '../Dashboard/redux/reducers/tasks';
import toolbox from '../Dashboard/redux/reducers/toolbox';
import modal from '../Dashboard/redux/reducers/modal';
import auth from '../Authorization/redux/reducers/authentication';

export default combineReducers({
    users,
    lists,
    tasks,
    toolbox,
    auth,
    modal
});
