import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import auth from '../../helper/auth';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Robocam
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const useStyles = makeStyles((theme) => ({
    main: {
        fontSize: "1.6rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        marginTop: "-4rem"
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#0076ad ",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        fontSize: "1.5rem",
        backgroundColor: "#0076ad",
        color: "white",
        border: "solid transparent 1px",
        "&:hover": {
            color: "#0076ad",
            backgroundColor: "white",
            border: "solid #0076ad 1px"
        }
    },
}));

const LoginPage = (props) => {
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [displayError, setDisplayError] = useState(false);

    const submitLoginForm = async (e) => {
        e.preventDefault();
        await auth.login(username, password, authenticateUser);
    }

    const authenticateUser = (wasSuccessful) => {
        console.log(wasSuccessful);
        if (wasSuccessful) {
            setDisplayError(false);
            props.setUserAuthenticated(true);
        } else {
            setDisplayError(true);
            props.setUserAuthenticated(false);
        }
    }

    return (
        <div className="login-container">
            <Grid item container xs={12} >
                <Container className={classes.main} component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Robocam - sign in
                        </Typography>
                        <form className={classes.form} onSubmit={submitLoginForm}>
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(event) => { setUsername(event.target.value) }}
                            />
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                                size="large"
                            >
                                Sign In
                            </Button>
                            {/* <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid> */}
                            {displayError && <Typography variant="h4" color="error">
                                Wrong username or password!
                            </Typography>}
                        </form>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
            </Grid>
        </div>
    );
}

export default LoginPage;