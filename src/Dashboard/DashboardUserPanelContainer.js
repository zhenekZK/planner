import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardUserPanel from './DashboardUserPanel';
import { logoutUser } from '../Authorization/redux/actions';
import { selectCurrentUser } from '../Authorization/redux/reducers/authentication';

class DashboardUserPanelContainer extends Component {
    render() {
        return (
            <DashboardUserPanel
                name={this.props.user.username}
                logOut = {this.props.logOut}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    user: selectCurrentUser(state)
});

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(logoutUser())
});

DashboardUserPanelContainer.defaultProps = {
    user: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardUserPanelContainer);
