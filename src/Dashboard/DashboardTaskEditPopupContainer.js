import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardTaskEditPopup from "./DashboardTaskEditPopup";
import { hideEditTaskPopup, showEditTaskPopup} from './redux/actions';


class DashboardTaskEditPopupContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            priority: this.props.priority
        }
    }

    createTask = () => {
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
            <DashboardTaskEditPopup
                open={this.props.open}
                title={this.state.title}
                createTask={this.createTask}
                updateTitle={this.updateTitle}
                handleClose={this.props.closePopup}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    open: state.toolbox.showTaskEditPopup
});

const mapDispatchToProps = (dispatch) => ({
    showTaskEditPopup: () => dispatch(showEditTaskPopup()),
    closePopup: () => dispatch(hideEditTaskPopup())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTaskEditPopupContainer);
