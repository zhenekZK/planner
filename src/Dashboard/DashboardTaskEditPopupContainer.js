import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardTaskEditPopup from "./DashboardTaskEditPopup";
import {editTask, hideEditTaskPopup, markTasksNotEditable, showEditTaskPopup} from './redux/actions';

class DashboardTaskEditPopupContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.taskInfo.id,
            title: props.taskInfo.title,
            priority: props.taskInfo.priority,
            description: props.taskInfo.description,
            status: props.taskInfo.status,
            list: props.taskInfo.list
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
                list
            } = props.taskInfo;

            return {
                id,
                title,
                priority,
                description,
                status,
                list
            }
        }

        return null;
    }

    updateField = (field, value) => {
        this.setState({ [field]: value }, () => console.log(this.state));
    };

    onSave = () => {
        const data = {
            title: this.state.title,
            priority: this.state.priority,
            description: this.state.description,
            status: this.state.status,
            list: this.state.list
        };

        this.props.editTask(data);
        this.onClose();
    };

    onClose = () => {
        this.props.onClose();
    };

    render() {
        console.log(this.props, 'TASK INFO');
        console.log(this.state, 'TASK INFO');

        return (
            <DashboardTaskEditPopup
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
    open: state.toolbox.showTaskEditPopup,
    taskInfo: state.tasks.byId[state.tasks.isEdited],
    allLists: {
        ...state.lists.byId
    }
});

const mapDispatchToProps = (dispatch) => ({
    editTask: (data) => dispatch(editTask(data)),
    showTaskEditPopup: () => dispatch(showEditTaskPopup()),
    onClose: () => {
        dispatch(markTasksNotEditable());
        dispatch(hideEditTaskPopup());
    }
});

DashboardTaskEditPopupContainer.defaultProps = {
    taskInfo: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTaskEditPopupContainer);
