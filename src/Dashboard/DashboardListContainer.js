import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardList from './DashboardList';

import { selectTasksByListId } from './redux/reducers/tasks';
import { deleteListRequest, addTaskRequest } from "./redux/actions";

class DashboardListContainer extends Component {
    render() {
        // console.log(this.props, 'lists');

        return (
            <DashboardList { ...this.props } />
        );
    }
}

const mapStateToProps = (state, props) => ({
    tasks: selectTasksByListId(state, props.id)
});

const mapDispatchToProps = (dispatch) => ({
    deleteList: (id) => dispatch(deleteListRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardListContainer);
