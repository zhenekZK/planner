import React from 'react';

import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(45deg, #f3f1f1 30%, #f3efef 70%)',
        border: 0,
        borderRadius: 5,
        padding: theme.spacing(2)
    },
    title: {}
}));

function DashboardTask(props) {
    const classes = useStyles();

    const {
        title,
        description,
        createdBy,
        priority,
        status
    } = props;

    return (
        <Grid item xs={12} sm={6}>
            <Paper className={classes.root}>
                <Typography align='center' gutterBottom>{title}</Typography>
                <Typography gutterBottom>{description}</Typography>
                <div>{`Status: ${status}`}</div>
                <div>{`Priority: ${priority}`}</div>
                <div>{`createdBy: ${createdBy}`}</div>
            </Paper>
        </Grid>
    );
}

export default DashboardTask;
