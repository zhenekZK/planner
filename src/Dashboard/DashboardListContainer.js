import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardList from './DashboardList';

class DashboardListContainer extends Component {
    render() {
        return (
            <DashboardList />
        );
    }
}

const mapStateToProps = (state) => {

};

export default connect()(DashboardListContainer);
