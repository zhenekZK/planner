import { combineReducers } from 'redux';
import users from './users';
import lists from './lists';
import tasks from './tasks';
import toolbox from './toolbox';

export default combineReducers({
    users,
    lists,
    tasks,
    toolbox
});
