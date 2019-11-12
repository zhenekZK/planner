import { combineReducers } from 'redux';
import users from './users';
import lists from './lists';
import tasks from './tasks';
import toolbox from './toolbox';
import currentUser from './authentication';

export default combineReducers({
    users,
    lists,
    tasks,
    toolbox,
    currentUser
});
