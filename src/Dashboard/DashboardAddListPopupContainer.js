import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import DashboardAddListPopup from "./DashboardAddListPopup";

import { addList, hideModal } from './redux/actions';

class DashboardAddListPopupContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: ''
        }
    }

    createList = () => {
        const listData = {
            title: this.state.title,
            description: this.state.description
        };

        this.props.createList(listData);
        this.onClose();
    };

    onClose = () => {
        this.setState({
            title: '',
            description: '',
        });

        this.props.onClose();
    };

    updateField = (field, value) => {
        this.setState({ [field]: value });
    };

    render() {
        return (
            <DashboardAddListPopup
                title={this.state.title}
                description={this.state.description}
                handleClose={this.onClose}
                createList={this.createList}
                updateField={this.updateField}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    createList: (data) => {
        dispatch(addList(data));
        dispatch(hideModal());
    },
    onClose: () => dispatch(hideModal()),
});

DashboardAddListPopupContainer.propTypes = {
    createList: PropTypes.func,
    onClose: PropTypes.func
};

export default connect(null, mapDispatchToProps)(DashboardAddListPopupContainer);
