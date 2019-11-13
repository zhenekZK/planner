import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardAddListPopup from "./DashboardAddListPopup";
import { addList, hideAddListPopup } from './redux/actions';


class DashboardAddListPopupContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    createList = () => {
        const data = {
            title: this.state.title
        };

        this.props.createList(data);
        this.props.closePopup();
    };

    updateTitle = (title) => {
        this.setState({ title });
    };

    render() {
        return (
            <DashboardAddListPopup
                open={this.props.open}
                title={this.state.title}
                createList={this.createList}
                updateTitle={this.updateTitle}
                handleClose={this.props.closePopup}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    open: state.toolbox.showAddListPopup
});

const mapDispatchToProps = (dispatch) => ({
    createList: (data) => {
        dispatch(hideAddListPopup());
        dispatch(addList(data))
    },
    closePopup: () => dispatch(hideAddListPopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAddListPopupContainer);
