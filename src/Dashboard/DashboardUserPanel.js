import React from 'react';

import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    panel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(45deg, #f3f1f1 30%, #f3efef 70%)',
        border: 0,
        borderRadius: 7,
        padding: theme.spacing(2)
    },
    title: {
        margin: '0 0 25px'
    }
}));

function DashboardUserPanel(props) {
    const classes = useStyles();

    const {
        name,
        logOut
    } = props;

    return (
        <Grid container justify="flex-end">
            <Grid item xs={6} sm={3}>
                <Paper className={classes.panel}>
                    <PersonIcon fontSize="large" />
                    <Typography align="center" className={classes.title}>{name}</Typography>
                    <IconButton
                        disableRipple={true}
                        disableFocusRipple={true}
                        onClick={logOut}
                    >
                        <ExitToAppIcon fontSize="large" />
                    </IconButton>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default DashboardUserPanel;
