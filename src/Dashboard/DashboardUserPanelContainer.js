import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import DashboardUserPanel from './DashboardUserPanel';

import { logoutUser } from '../Authorization/redux/actions';
import { selectCurrentUser } from '../Authorization/redux/reducers/authentication';

class DashboardUserPanelContainer extends Component {
    render() {
        return (
            <DashboardUserPanel
                name={this.props.user.name}
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

DashboardUserPanelContainer.propTypes = {
    user: PropTypes.object,
    logOut: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardUserPanelContainer);
