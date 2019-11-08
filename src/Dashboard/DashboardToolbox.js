import React from 'react';

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

export default DashboardToolbox;
