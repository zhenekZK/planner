import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import DashboardToolbox from './DashboardToolbox';

import { showAddListPopup } from './redux/actions'

class DashboardToolboxContainer extends Component {
    render() {
        return (
            <DashboardToolbox showAddListPopup={this.props.showAddListPopup} />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    showAddListPopup: () => dispatch(showAddListPopup())
});

DashboardToolboxContainer.propTypes = {
    showAddListPopup: PropTypes.func
};

export default connect(null, mapDispatchToProps)(DashboardToolboxContainer);
