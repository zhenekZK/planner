import React, { Component } from 'react';
import Dashboard from "./Dashboard";
import { connect } from 'react-redux';
import { selectAllListsAsArray } from './redux/reducers/lists';

class DashboardContainer extends Component {
    render() {
        return (
            <Dashboard
                lists={this.props.lists}
                showAddListPopup={this.props.showAddListPopup}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    lists: selectAllListsAsArray(state)
});

export default connect(mapStateToProps)(DashboardContainer);
