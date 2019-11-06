import React from 'react';
import DashboardListContainer from "./DashboardListContainer";

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #96cfab 30%, #83d884 70%)',
        border: 0,
        borderRadius: 5,
        boxShadow: '0 3px 5px 2px rgba(131, 216, 130, .25)',
        padding: '20px',
    },
});

function Dashboard(props) {
    const classes = useStyles();

    const {
        lists
    } = props;

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" className={classes.root}>
                <Grid container spacing={3}>
                    {lists.map((list, index) => (
                        <DashboardListContainer key={index} title={list.title} tasks={list.tasks} />
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default Dashboard;
