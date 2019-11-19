import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import DashboardTask from './DashboardTask';

import { markTaskEditable, removeTask, showEditTaskPopup } from './redux/actions';
import { selectUserNameById, selectUserNames } from './redux/reducers/users';

class DashboardTaskContainer extends Component {
    render() {
        return (
            <DashboardTask {...this.props} />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    owner: selectUserNameById(state, ownProps.owner_id),
    updatedby: selectUserNameById(state, ownProps.updatedby_id),
    assigns: selectUserNames(state, ownProps.assigns)
});

const mapDispatchToProps = (dispatch) => ({
    deleteTask: (id) => dispatch(removeTask(id)),
    editTask: (id) => {
        dispatch(markTaskEditable(id));
        dispatch(showEditTaskPopup());
    }
});

DashboardTaskContainer.defaultProps = {
    owner: '',
    updatedby: '',
    assigns: []
};

DashboardTaskContainer.propTypes = {
    owner: PropTypes.string,
    updatedby: PropTypes.string,
    assigns: PropTypes.array,
    deleteTask: PropTypes.func,
    editTask: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTaskContainer);
