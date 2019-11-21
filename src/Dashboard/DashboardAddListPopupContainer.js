import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import DashboardAddListPopup from "./DashboardAddListPopup";

import { addList, hideAddListPopup } from './redux/actions';
import { selectAddListPopupIsShowing } from './redux/selectors';

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
        this.closePopup();
    };

    closePopup = () => {
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
                open={this.props.open}
                handleClose={this.closePopup}
                createList={this.createList}
                updateField={this.updateField}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    open: selectAddListPopupIsShowing(state)
});

const mapDispatchToProps = (dispatch) => ({
    createList: (data) => {
        dispatch(hideAddListPopup());
        dispatch(addList(data))
    },
    onClose: () => dispatch(hideAddListPopup()),
});

DashboardAddListPopupContainer.defaultProps = {
    open: false
};

DashboardAddListPopupContainer.propTypes = {
    open: PropTypes.bool,
    createList: PropTypes.func,
    onClose: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAddListPopupContainer);
