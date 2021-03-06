import React from 'react';
import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
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
        }
    },
    title: {
        marginRight: '20px',
        marginLeft: '20px',
    },
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
        owner,
        updatedby,
        assigns,
        priority,
        status,
        editTask,
        deleteTask
    } = props;

    return (
        <Grid item xs={12} sm={6}>
            <Paper className={classes.root}>
                <Typography align='center' className={classes.title} gutterBottom>{title}</Typography>
                <Typography gutterBottom>{description}</Typography>
                <div>{`Status: ${status}`}</div>
                <div>{`Priority: ${priority}`}</div>
                <div>{`Assigns: ${assigns.join(', ')}`}</div>
                <div>{`Created by: ${owner}`}</div>
                <div>{`Updated by: ${updatedby}`}</div>
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

DashboardTask.defaultProps = {
    id: null,
    title: '',
    description: '',
    owner: '',
    updatedby: '',
    assigns: [],
    priority: '',
    status: ''
};

DashboardTask.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    updatedby: PropTypes.string,
    assigns: PropTypes.array,
    priority: PropTypes.string,
    status: PropTypes.string,
    editTask: PropTypes.func,
    deleteTask: PropTypes.func
};

export default DashboardTask;
