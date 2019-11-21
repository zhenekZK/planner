import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import DashboardList from './DashboardList';

import { selectTasksByListId } from './redux/selectors';
import { deleteListRequest, markListEditable, showAddTaskPopup } from "./redux/actions";

class DashboardListContainer extends Component {
    render() {
        return (
            <DashboardList { ...this.props } />
        );
    }
}

const mapStateToProps = (state, props) => ({
    tasks: selectTasksByListId(state, props.id)
});

const mapDispatchToProps = (dispatch) => ({
    addTask: (id) => {
        dispatch(markListEditable(id));
        dispatch(showAddTaskPopup());
    },
    deleteList: (id) => dispatch(deleteListRequest(id))
});

DashboardListContainer.defaultProps = {
    tasks: []
};

DashboardListContainer.propTypes = {
    tasks: PropTypes.array,
    addTask: PropTypes.func,
    deleteList: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardListContainer);
