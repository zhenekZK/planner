import React from 'react';

import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        background: 'linear-gradient(45deg, #f3f1f1 30%, #f3efef 70%)',
        border: 0,
        borderRadius: 5,
        padding: theme.spacing(2),
        '& $edit, & $delete': {
            position: 'absolute',
            opacity: '0',
            transition: 'opacity 0.3s linear'
        },
        '&:hover': {
            '& $delete, & $edit': {
                opacity: '1'
            }
        },
    },
    title: {},
    edit: {
        top: '0',
        left: '0'
    },
    delete: {
        top: '0',
        right: '0'
    }
}));

function DashboardTask(props) {
    const classes = useStyles();

    const {
        id,
        title,
        description,
        createdBy,
        priority,
        status,
        editTask,
        deleteTask
    } = props;

    console.log(props, 'TASKSSSSSSSSS');

    return (
        <Grid item xs={12} sm={6}>
            <Paper className={classes.root}>
                <Typography align='center' gutterBottom>{title}</Typography>
                <Typography gutterBottom>{description}</Typography>
                <div>{`Status: ${status}`}</div>
                <div>{`Priority: ${priority}`}</div>
                <div>{`createdBy: ${createdBy}`}</div>
                <IconButton
                    onClick={() => editTask(id)}
                    className={classes.edit}
                    disableRipple={true}
                    disableFocusRipple={true}
                >
                    <EditIcon size='small' />
                </IconButton>
                <IconButton
                    onClick={() => deleteTask(id)}
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

export default DashboardTask;
