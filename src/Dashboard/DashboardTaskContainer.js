import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardTask from './DashboardTask';
import { markTaskEditable, removeTask, showEditTaskPopup } from './redux/actions';

class DashboardTaskContainer extends Component {
    render() {
        return (
            <DashboardTask {...this.props} />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    createdBy: state.users.byId[ownProps.createdBy].name
});

const mapDispatchToProps = (dispatch) => ({
    deleteTask: (id) => dispatch(removeTask(id)),
    editTask: (id) => {
        dispatch(markTaskEditable(id));
        dispatch(showEditTaskPopup());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTaskContainer);
