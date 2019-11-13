import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardList from './DashboardList';

import { selectTasksByListId } from './redux/reducers/tasks';

class DashboardListContainer extends Component {
    render() {
        const {
            title,
            tasks
        } = this.props;

        return (
            <DashboardList title={title} tasks={tasks} />
        );
    }
}

const mapStateToProps = (state, props) => ({
    tasks: selectTasksByListId(state, props.id)
});

export default connect(mapStateToProps)(DashboardListContainer);
