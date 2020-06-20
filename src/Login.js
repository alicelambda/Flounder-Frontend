import React from 'react'
import Grid from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));


export default function Login(props) {

    const classes = useStyles();
    const [username, updateUsername] = React.useState("");
    const [password, updatePassword] = React.useState("");
    const API_URL = window.API_URL;

    const onUser = (event) => {
        updateUsername(event.target.value)
    }

    const onPass = (event) => {
        updatePassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(API_URL + '/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('cookie', data.cookie)
                props.setCookie(data.cookie)
            })
    }


    return (
        <div className={classes.root}>
            <Grid
                container
                direction="column"
                justify="space-around"
                align="center"
            >
                <form
                    noValidate
                    className={classes}
                    onSubmit={handleSubmit}
                >
                    <br />
                    <br />
                    <Typography gutterBottom variant="h5" component="h2">
                        Pwz Login
        </Typography>
                    <TextField
                        id="standard-basic"
                        variant="outlined"
                        onChange={onUser}
                        label="Username" />
                    <br />
                    <br />
                    <TextField
                        id="standard-basic"
                        variant="outlined"
                        type="password"
                        onChange={onPass}
                        label="Password" />
                    <br></br>

                    <br />
                    <Button type="submit" variant="contained">Login</Button>
                </form>
            </Grid>
        </div>
    )
}
