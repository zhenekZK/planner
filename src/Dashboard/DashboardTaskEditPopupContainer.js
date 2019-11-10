import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardTaskEditPopup from "./DashboardTaskEditPopup";
import {hideEditTaskPopup, markTasksNotEditable, showEditTaskPopup} from './redux/actions';

class DashboardTaskEditPopupContainer extends Component {
    constructor(props) {
        super(props);

        console.log(props, 'PROPS');

        this.state = {
            id: props.taskInfo.id,
            title: props.taskInfo.title,
            priority: props.taskInfo.priority,
            description: props.taskInfo.description,
            status: props.taskInfo.status
        };
    }

    static getDerivedStateFromProps(props, currentState) {
        if (currentState.id !== props.taskInfo.id) {
            const {
                id,
                title,
                priority,
                description,
                status
            } = props.taskInfo;

            return {
                id,
                title,
                priority,
                description,
                status
            }
        }

        return null;
    }

    editTask = () => {
        const data = {
            title: this.state.title
        };

        this.props.createList(data);
        this.props.closePopup();
    };

    updateField = (field, value) => {
        this.setState({ [field]: value }, () => console.log(this.state));
    };

    onClose = () => {
        // this.setState({setState}, () => console.log(this.state));

        this.props.onClose();
    };

    render() {
        console.log(this.props, 'TASK INFO');
        console.log(this.state, 'TASK INFO');

        return (
            <DashboardTaskEditPopup
                {...this.state}
                open={this.props.open}
                createTask={this.editTask}
                updateField={this.updateField}
                onClose={this.props.onClose}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    open: state.toolbox.showTaskEditPopup,
    taskInfo: state.tasks.byId[state.tasks.isEdited]
});

const mapDispatchToProps = (dispatch) => ({
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
