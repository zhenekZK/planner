import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import DashboardTask from './DashboardTask';

import { markTaskEditable, removeTaskRequest, showEditTaskPopup } from './redux/actions';
import { selectUserNameById, selectUserNames } from './redux/reducers/users';

class DashboardTaskContainer extends Component {
    render() {
        console.log(this.props, 'DashboardTaskContainer');

        return (
            <DashboardTask {...this.props} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state, "STATE");
    console.log(ownProps, "OWNPROPS");

    return {
        owner: selectUserNameById(state, ownProps.owner_id),
        updatedby: selectUserNameById(state, ownProps.updatedby_id),
        assigns: selectUserNames(state, ownProps.assigns)
    }
};

const mapDispatchToProps = (dispatch) => ({
    deleteTask: (id) => dispatch(removeTaskRequest(id)),
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
