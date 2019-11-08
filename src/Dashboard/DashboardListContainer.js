import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardList from './DashboardList';

class DashboardListContainer extends Component {
    render() {
        const {
            title,
            tasks
        } = this.props;

        console.log(this.props, 'DashboardListContainer');

        return (
            <DashboardList title={title} tasks={tasks} />
        );
    }
}

const getTasksByListId = (id, state) => {
    const taskIds = state.tasks.allIds;

    const fitIds = taskIds.filter(taskId => {
        const task = state.tasks.byId[taskId];
        return task.list === id
    });

    return fitIds.map(taskId => state.tasks.byId[taskId]);
};

const mapStateToProps = (state, props) => ({
    tasks: getTasksByListId(props.id, state)
});

export default connect(mapStateToProps)(DashboardListContainer);
