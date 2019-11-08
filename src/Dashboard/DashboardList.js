import React from 'react';
import DashboardTaskContainer from './DashboardTaskContainer';

import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    list: {
        position: 'relative',
        background: 'linear-gradient(45deg, #f3f1f1 30%, #f3efef 70%)',
        border: 0,
        borderRadius: 7,
        padding: theme.spacing(2)
    },
    title: {
        margin: '0 0 25px'
    },
    delete: {
        position: 'absolute',
        top: '0',
        right: '0',
        // opacity: '0',
        transition: 'opacity 0.3s linear'
    }
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
                        <DashboardTaskContainer
                            key={index}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            createdBy={task.createdBy}
                            priority={task.priority}
                            status={task.status}
                        />
                    )) : null}
                </Grid>
                <IconButton
                    className={classes.delete}
                    disableRipple={true}
                    disableFocusRipple={true}
                >
                    <DeleteIcon size='small' />
                </IconButton>
            </Paper>
        </Grid>
    );
}

export default DashboardList;
