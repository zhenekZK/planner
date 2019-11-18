import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardTaskAddPopup from "./DashboardTaskAddPopup";
import {
    addTaskRequest,
    hideAddTaskPopup,
    markListNotEditable,
    showEditTaskPopup
} from './redux/actions';
import {selectAllLists, selectEditableListId} from './redux/reducers/lists';
import { selectTaskAddPopupIsShowing } from './redux/reducers/toolbox';

class DashboardTaskAddPopupContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            priority: 'low',
            description: '',
            status: 'open',
            list: props.listId
        };
    }

    static getDerivedStateFromProps(props, currentState) {
        if (currentState.list !== props.listId) {
            return {
                list: props.listId
            }
        }

        return null;
    }

    updateField = (field, value) => {
        this.setState({ [field]: value }, () => console.log(this.state));
    };

    onSave = () => {
        const data = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            priority: this.state.priority,
            status: this.state.status,
            list: this.state.list
        };

        this.props.addTask(data);
        this.props.markListNotEditable(data.list);
        this.onClose();
    };

    onClose = () => {
        this.setState({
            title: '',
            priority: '',
            description: '',
            status: '',
            list: ''
        });

        this.props.markListNotEditable(this.state.list);
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
    listId: selectEditableListId(state),
    allLists: selectAllLists(state)
});

const mapDispatchToProps = (dispatch) => ({
    addTask: (data) => dispatch(addTaskRequest(data)),
    markListNotEditable: (id) => dispatch(markListNotEditable(id)),
    onClose: () => dispatch(hideAddTaskPopup())
});

DashboardTaskAddPopupContainer.defaultProps = {
    list: null
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTaskAddPopupContainer);
