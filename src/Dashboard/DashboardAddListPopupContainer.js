import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardAddListPopup from "./DashboardAddListPopup";
import { addList, hideAddListPopup } from './redux/actions';
import { selectAddListPopupIsShowing } from './redux/reducers/toolbox';

class DashboardAddListPopupContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: ''
        }
    }

    createList = () => {
        const data = {
            title: this.state.title,
            description: this.state.description
        };

        this.props.createList(data);
        this.props.closePopup();

        this.setState({ title: '', description: '' });
    };

    updateField = (field, value) => {
        this.setState({ [field]: value });
    };

    render() {
        return (
            <DashboardAddListPopup
                open={this.props.open}
                title={this.state.title}
                description={this.state.description}
                createList={this.createList}
                updateField={this.updateField}
                handleClose={this.props.closePopup}
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
    closePopup: () => dispatch(hideAddListPopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAddListPopupContainer);
