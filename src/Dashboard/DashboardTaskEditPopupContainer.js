import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import DashboardTaskEditPopup from "./DashboardTaskEditPopup";

import {
    editTaskRequest,
    hideModal,
    removeActiveTask
} from './redux/actions';

import {
    selectTaskById,
    selectActiveTaskId,
    selectAllLists,
    selectAssignsDataByTaskId
} from './redux/selectors';
import { requestMaker } from "../helpers/requestMaker";

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
            assigns: props.assigns,
            allUsers: []
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

    componentDidMount() {
        requestMaker('user/', 'get')
            .then((response) => response.data)
            .then(({ message, ...data }) => {
                if (message) {
                    throw new Error('Problem with user loading');
                } else {
                    this.setState( { allUsers: [ ...data.users ] });
                }
            });
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
        this.onClose();
    };

    onClose = () => {
        this.props.onClose();
    };

    render() {
        return (
            <DashboardTaskEditPopup
                {...this.state}
                allLists={this.props.allLists}
                allUsers={this.state.allUsers.map(user => ({
                    value: user.id,
                    label: `${user.name} ${user.surname}`
                }))}
                updateField={this.updateField}
                onSave={this.onSave}
                onClose={this.onClose}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    taskInfo: selectTaskById(state, selectActiveTaskId(state)),
    allLists: selectAllLists(state),
    assigns: selectAssignsDataByTaskId(state, selectActiveTaskId(state))
});

const mapDispatchToProps = (dispatch) => ({
    editTask: (data) => dispatch(editTaskRequest(data)),
    onClose: () => {
        dispatch(removeActiveTask());
        dispatch(hideModal());
    }
});

DashboardTaskEditPopupContainer.defaultProps = {
    taskInfo: {},
    allLists: {},
    assigns: []
};

DashboardTaskEditPopupContainer.propTypes = {
    taskInfo: PropTypes.object,
    allLists: PropTypes.object,
    editTask: PropTypes.func,
    onClose: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTaskEditPopupContainer);
