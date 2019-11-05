import React, { Component } from 'react';
import Dashboard from "./Dashboard";
import { connect } from 'react-redux';

class DashboardContainer extends Component {
    render() {
        // console.log(this.props);
        return (
            <Dashboard />
        );
    }
}

const mapStateToProps = (state) => {
    // debugger;
    console.log(state);

};

export default connect(mapStateToProps)(DashboardContainer);
