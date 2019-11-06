import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardToolbox from './DashboardToolbox';

import { showAddListPopup } from './redux/actions'

class DashboardToolboxContainer extends Component {
    render() {
        console.log(this.props, 'DashboardToolboxContainer');

        return (
            <DashboardToolbox showAddListPopup={this.props.showAddListPopup} />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    showAddListPopup: () => dispatch(showAddListPopup())
});

export default connect(null, mapDispatchToProps)(DashboardToolboxContainer);
