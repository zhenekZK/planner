import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import DashboardTaskAddPopup from "./DashboardTaskAddPopup";

import {
    addTaskRequest,
    hideAddTaskPopup,
    markListNotEditable
} from './redux/actions';
import { selectAllLists, selectEditableListId } from './redux/reducers/lists';
import { selectTaskAddPopupIsShowing } from './redux/reducers/toolbox';

class DashboardTaskAddPopupContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            priority: 'low',
            description: '',
            status: 'open',
            list_id: props.list_id
        };
    }

    static getDerivedStateFromProps(props, currentState) {
        if (currentState.list_id !== props.list_id) {
            return {
                list_id: props.list_id
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
            description: this.state.description,
            priority: this.state.priority,
            status: this.state.status,
            list_id: this.state.list_id
        };

        this.props.addTask(taskData);
        this.props.markListNotEditable(taskData.list_id);
        this.onClose();
    };

    onClose = () => {
        this.setState({
            title: '',
            priority: '',
            description: '',
            status: '',
            list_id: null
        });

        this.props.markListNotEditable(this.state.list_id);
        this.props.onClose();
    };

    render() {
        return (
            <DashboardTaskAddPopup
                {...this.state}
                open={this.props.open}
                allLists={this.props.allLists}
                createTask={this.editTask}
                updateField={this.updateField}
                onSave={this.onSave}
                onClose={this.onClose}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    open: selectTaskAddPopupIsShowing(state),
    list_id: selectEditableListId(state),
    allLists: selectAllLists(state)
});

const mapDispatchToProps = (dispatch) => ({
    addTask: (data) => dispatch(addTaskRequest(data)),
    markListNotEditable: (id) => dispatch(markListNotEditable(id)),
    onClose: () => dispatch(hideAddTaskPopup())
});

DashboardTaskAddPopupContainer.defaultProps = {
    list_id: null,
    open: false,
    allLists: {}
};

DashboardTaskAddPopupContainer.propTypes = {
    list_id: PropTypes.number,
    open: PropTypes.bool,
    allLists: PropTypes.object,
    addTask: PropTypes.func,
    markListNotEditable: PropTypes.func,
    onClose: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTaskAddPopupContainer);
