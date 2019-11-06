import React from 'react';

import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";

// const useStyles = makeStyles(theme => ({
    // list: {
    //     background: 'linear-gradient(45deg, #f3f1f1 30%, #f3efef 70%)',
    //     border: 0,
    //     borderRadius: 7,
    //     padding: theme.spacing(2)
    // },
    // title: {}
// }));

function DashboardToolbox(props) {
    // const classes = useStyles();

    console.log(props, 'DashboardToolbox');

    return (
        <div>
            <IconButton onClick={props.showAddListPopup}>
                <AddCircleIcon color="primary" fontSize="large" />
            </IconButton>
        </div>
    );
}

export default DashboardToolbox;
