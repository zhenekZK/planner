import React from 'react';
import PropTypes from "prop-types";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    add: {
        display: 'block',
        margin: '0px auto'
    }
}));

function DashboardToolbox(props) {
    const classes = useStyles();

    return (
        <div>
            <IconButton onClick={props.showAddListPopup} className={classes.add}>
                <AddCircleIcon color="primary" fontSize="large" />
            </IconButton>
        </div>
    );
}

DashboardToolbox.propTypes = {
    showAddListPopup: PropTypes.func
};

export default DashboardToolbox;
