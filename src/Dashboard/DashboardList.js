import React from 'react';
import DashboardTask from './DashboardTask';

import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    list: {
        background: 'linear-gradient(45deg, #f3f1f1 30%, #f3efef 70%)',
        border: 0,
        borderRadius: 7,
        padding: theme.spacing(2)
    },
    title: {}
}));

function DashboardList(props) {
    const classes = useStyles();

    const {
        title,
        tasks
    } = props;

    return (
        <Grid item xs={12} sm={6}>
            <Paper className={classes.list}>
                <Typography align="center" className={classes.title} gutterBottom>{title}</Typography>
                <Grid container spacing={3}>
                    {tasks ? tasks.map((task, index) => (
                        <DashboardTask
                            key={index}
                            title={task.title}
                            description={task.description}
                            createdBy={task.createdBy}
                            priority={task.priority}
                            status={task.status}
                        />
                    )) : null}
                </Grid>
            </Paper>
        </Grid>
    );
}

export default DashboardList;
