import React from 'react';
import PropTypes from "prop-types";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";

function DashboardToolbox(props) {
    return (
        <div>
            <IconButton onClick={props.showAddListPopup}>
                <AddCircleIcon color="primary" fontSize="large" />
            </IconButton>
        </div>
    );
}

DashboardToolbox.propTypes = {
    showAddListPopup: PropTypes.func
};

export default DashboardToolbox;
