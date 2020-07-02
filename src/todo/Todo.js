import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


function Todo() {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Typography variant="h6" >Make Bed</Typography>
            <Typography>00:00</Typography>
            <Grid container spacing={3}>
                <Grid item xs={1}/>
                <Grid item xs={6}>
                    <Slider />
                </Grid>
                <Button xs={6}>
                    Start
            </Button>
            </Grid>
        </Paper>
    );
}

export default Todo;