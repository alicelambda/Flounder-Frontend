import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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


function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <h1>Dailies</h1>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
      <Grid item xs={4}>
        <h1>Todo</h1>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
      <Grid item xs={4}>
        <h1>Rewards</h1>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
    </Grid>
  </div>
  );
}

export default App;
