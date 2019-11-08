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
    lists: state.lists.allIds.map(id => state.lists.byId[id])
});

export default connect(mapStateToProps)(DashboardContainer);
