import { combineReducers } from 'redux';
import lists from './lists';
import tasks from './tasks';
import toolbox from './toolbox';

export default combineReducers({
    lists,
    tasks,
    toolbox
});
