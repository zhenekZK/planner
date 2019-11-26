import React from 'react';
import PropTypes from "prop-types";

import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        background: 'linear-gradient(45deg, #96cfab 30%, #83d884 70%)',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function LoginPage(props) {
    const classes = useStyles();

    const {
        email,
        password,
        onChange,
        onSubmit
    } = props;

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <MeetingRoomIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form} onSubmit={onSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={email}
                                onChange={onChange}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={password}
                                onChange={onChange}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                Want to create account? Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

LoginPage.defaultProps = {
    email: '',
    password: ''
};

LoginPage.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
};

export default LoginPage;
