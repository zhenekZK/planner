import React from 'react';
import PropTypes from "prop-types";

import DashboardTaskContainer from './DashboardTaskContainer';

import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
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
        margin: '0 0 20px'
    },
    description: {
        color: '#777',
        fontSize: '13px',
        margin: '20px 0'
    },
    delete: {
        position: 'absolute',
        top: '0',
        right: '0'
    },
    add: {
        position: 'absolute',
        top: '0',
        left: '0'
    }
}));

function DashboardList(props) {
    const classes = useStyles();

    const {
        id,
        title,
        description,
        tasks,
        addTask,
        deleteList
    } = props;

    return (
        <Grid item xs={12} sm={6}>
            <Paper className={classes.list}>
                <Typography align="center" className={classes.title} gutterBottom>{title}</Typography>
                {description && <Typography align="center" className={classes.description} gutterBottom>{description}</Typography>}
                <Grid container spacing={3}>
                    {tasks ? tasks.map((task, index) => (
                        <DashboardTaskContainer key={index} { ...task } />
                    )) : null}
                </Grid>
                <IconButton
                    className={classes.add}
                    disableRipple={true}
                    disableFocusRipple={true}
                    onClick={(e) => addTask(id)}
                >
                    <AddCircleIcon size='small' />
                </IconButton>
                <IconButton
                    className={classes.delete}
                    disableRipple={true}
                    disableFocusRipple={true}
                    onClick={(e) => deleteList(id)}
                >
                    <DeleteIcon size='small' />
                </IconButton>
            </Paper>
        </Grid>
    );
}

DashboardList.defaultProps = {
    id: null,
    title: '',
    description: ''
};

DashboardList.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    tasks: PropTypes.array,
    addTask: PropTypes.func,
    deleteList: PropTypes.func
};

export default DashboardList;
