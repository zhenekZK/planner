import React, { Component } from 'react';
import Dashboard from "./Dashboard";
import { connect } from 'react-redux';

class DashboardContainer extends Component {
    render() {
        return (
            <Dashboard lists={this.props.lists} />
        );
    }
}

const mapStateToProps = (state) => ({
    lists: state.lists
});

export default connect(mapStateToProps)(DashboardContainer);
