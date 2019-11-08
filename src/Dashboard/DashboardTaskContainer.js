import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardTask from './DashboardTask';
import { removeTask } from './redux/actions';

class DashboardTaskContainer extends Component {
    render() {
        console.log(this.props, 'DashboardTaskContainer');
        return (
            <DashboardTask {...this.props} />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteTask: (id) => dispatch(removeTask(id))
});

export default connect(null, mapDispatchToProps)(DashboardTaskContainer);
