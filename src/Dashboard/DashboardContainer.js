import React, { Component } from 'react';
import Dashboard from "./Dashboard";
import { connect } from 'react-redux';
import { selectAllListsAsArray } from './redux/selectors';
import { getListsFetch } from './redux/actions';

class DashboardContainer extends Component {
    componentDidMount() {
        this.props.loadTasks();
    }

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

const mapDispatchToProps = (dispatch) => ({
    loadTasks: () => dispatch(getListsFetch())
});

DashboardContainer.defaultProps = {
    lists: []
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
