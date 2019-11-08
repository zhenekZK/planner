import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardTask from './DashboardTask';
import { markTaskEditable, removeTask, showEditTaskPopup } from './redux/actions';

class DashboardTaskContainer extends Component {
    render() {
        console.log(this.props, 'DashboardTaskContainer');
        return (
            <DashboardTask {...this.props} />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteTask: (id) => dispatch(removeTask(id)),
    editTask: (id) => {
        dispatch(markTaskEditable(id));
        dispatch(showEditTaskPopup());
    }
});

export default connect(null, mapDispatchToProps)(DashboardTaskContainer);
