import React, { Component } from 'react';
import { connect } from 'react-redux';
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

// const mapStateToProps = (state) => ({
    // list: state.lists
// });

export default connect()(DashboardListContainer);
