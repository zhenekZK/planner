import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardTask from './DashboardTask';
import { markTaskEditable, removeTask, showEditTaskPopup } from './redux/actions';
import { selectUserNames } from './redux/reducers/users';

class DashboardTaskContainer extends Component {
    render() {
        return (
            <DashboardTask {...this.props} />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    assigns: selectUserNames(state, ownProps.assigns)
});

const mapDispatchToProps = (dispatch) => ({
    deleteTask: (id) => dispatch(removeTask(id)),
    editTask: (id) => {
        dispatch(markTaskEditable(id));
        dispatch(showEditTaskPopup());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTaskContainer);
