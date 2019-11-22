import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import DashboardTaskEditPopup from "./DashboardTaskEditPopup";

import {
    editTaskRequest,
    hideEditTaskPopup,
    markTaskNotEditable
} from './redux/actions';

import {
    selectTaskById,
    selectEditableTaskId,
    selectAllLists,
    selectTaskEditPopupIsShowing,
    selectAllUsersAsArray,
    selectAssignsDataByTaskId
} from './redux/selectors';

class DashboardTaskEditPopupContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.taskInfo.id,
            title: props.taskInfo.title,
            priority: props.taskInfo.priority,
            description: props.taskInfo.description,
            status: props.taskInfo.status,
            list_id: props.taskInfo.list_id,
            assigns: props.assigns
        };
    }

    static getDerivedStateFromProps(props, currentState) {
        if (currentState.id !== props.taskInfo.id) {
            const {
                id,
                title,
                priority,
                description,
                status,
                list_id
            } = props.taskInfo;

            const assigns = props.assigns;

            return {
                id,
                title,
                priority,
                description,
                status,
                list_id,
                assigns
            }
        }

        return null;
    }

    updateField = (field, value) => {
        this.setState({ [field]: value });
    };

    onSave = () => {
        const taskData = {
            id: this.state.id,
            title: this.state.title,
            priority: this.state.priority,
            description: this.state.description,
            status: this.state.status,
            list_id: this.state.list_id,
            assigns: this.state.assigns ? this.state.assigns.map((assign) => assign.value) : []
        };

        this.props.editTask(taskData);
        this.props.markTaskNotEditable(taskData.id);
        this.onClose();
    };

    onClose = () => {
        this.props.markTaskNotEditable(this.state.id);
        this.props.onClose();
    };

    render() {
        return (
            <DashboardTaskEditPopup
                {...this.state}
                open={this.props.open}
                allLists={this.props.allLists}
                allUsers={this.props.allUsers.map(user => ({
                    value: user.id,
                    label: `${user.name} ${user.surname}`
                }))}
                createTask={this.editTask}
                updateField={this.updateField}
                onSave={this.onSave}
                onClose={this.onClose}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    open: selectTaskEditPopupIsShowing(state),
    taskInfo: selectTaskById(state, selectEditableTaskId(state)),
    allLists: selectAllLists(state),
    allUsers: selectAllUsersAsArray(state),
    assigns: selectAssignsDataByTaskId(state, selectEditableTaskId(state))
});

const mapDispatchToProps = (dispatch) => ({
    editTask: (data) => dispatch(editTaskRequest(data)),
    markTaskNotEditable: (id) => dispatch(markTaskNotEditable(id)),
    onClose: () => dispatch(hideEditTaskPopup())
});

DashboardTaskEditPopupContainer.defaultProps = {
    open: false,
    taskInfo: {},
    allLists: {},
    assigns: []
};

DashboardTaskEditPopupContainer.propTypes = {
    open: PropTypes.bool,
    taskInfo: PropTypes.object,
    allLists: PropTypes.object,
    editTask: PropTypes.func,
    markTaskNotEditable: PropTypes.func,
    onClose: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTaskEditPopupContainer);
