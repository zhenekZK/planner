import React from 'react';
import { connect } from 'react-redux';
import AddListModal from './DashboardAddListPopupContainer';
import AddTaskModal from './DashboardTaskAddPopupContainer';
import EditTaskModal from './DashboardTaskEditPopupContainer';

import { selectModalData } from './redux/selectors';

const MODAL_COMPONENTS = {
    'ADD_LIST': AddListModal,
    'ADD_TASK': AddTaskModal,
    'EDIT_TASK': EditTaskModal
};

const DashboardModal = (props) => {
    const { modalType, modalProps } = props.state;

    console.log(modalType, modalProps);
    if (!modalType) {
        return null;
    }

    const ModalContent = MODAL_COMPONENTS[modalType];
    return <ModalContent {...modalProps} />
};

const mapStateToProps = (state) => ({
    state: selectModalData(state)
});

// const mapDispatchToProps = (dispatch) => ({
//
// });

export default connect(mapStateToProps, null)(DashboardModal);
