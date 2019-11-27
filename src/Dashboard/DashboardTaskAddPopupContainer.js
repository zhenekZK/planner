import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import DashboardTaskAddPopup from "./DashboardTaskAddPopup";

import {
    addTaskRequest,
    hideModal,
    removeActiveList,
} from './redux/actions';

import {
    selectAllLists,
    selectActiveListId
} from './redux/selectors';
import { requestMaker } from "../helpers/requestMaker";

class DashboardTaskAddPopupContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            priority: 'low',
            description: '',
            status: 'open',
            list_id: props.list_id,
            assigns: [],
            allUsers: []
        };
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
            title: this.state.title,
            description: this.state.description,
            priority: this.state.priority,
            status: this.state.status,
            list_id: this.state.list_id,
            assigns: this.state.assigns.map((assign) => assign.value)
        };

        this.props.addTask(taskData);
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

        this.props.onClose();
    };

    render() {
        return (
            <DashboardTaskAddPopup
                {...this.state}
                allLists={this.props.allLists}
                allUsers={this.state.allUsers.map(user => ({
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
    list_id: selectActiveListId(state),
    allLists: selectAllLists(state)
});

const mapDispatchToProps = (dispatch) => ({
    addTask: (data) => dispatch(addTaskRequest(data)),
    onClose: () => {
        dispatch(removeActiveList());
        dispatch(hideModal());
    }
});

DashboardTaskAddPopupContainer.defaultProps = {
    list_id: null,
    allLists: {}
};

DashboardTaskAddPopupContainer.propTypes = {
    list_id: PropTypes.number,
    allLists: PropTypes.object,
    addTask: PropTypes.func,
    onClose: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTaskAddPopupContainer);
