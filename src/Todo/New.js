import React from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));



export default function New(props) {
  const classes = useStyles();
  const API_URL = window.API_URL;
  const [title, updateTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [date, setDate] = React.useState(new Date());

  const onTitle = (event) => {
    updateTitle(event.target.value)
  }

  const onDes = (event) => {
    setDescription(event.target.value)
  }

  const onSub = (event) => {
    setSubject(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var options = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    };
    const tododata = {
      title: title,
      description: description,
      subject: subject,
      date: date.toLocaleDateString("en-US", options),
      cookie: props.cookie
    }

    fetch(API_URL + '/api/todo/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tododata)
    })
      .then(response => response.json())
      .then(data => {
        props.pushTodo(data.newtodo)
        props.setCoins(props.coins + data.coins)
        new Notification("Finished " + title, {
          "icon": "https://todo.alicereuter.com/favicon.ico",
          "body": "Got " + data.coins + " thought coins"
      });
      })
    props.onClose()
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid
            container
            direction="column"
            justify="space-around"
            align="center"
          >
            <form
              noValidate
              className={classes.root}
              onSubmit={handleSubmit}
            >
              <br />
              <br />
              <Typography gutterBottom variant="h5" component="h2">
                Create Todo
          </Typography>
              <TextField
                id="standard-basic"
                variant="outlined"
                value={title}
                onChange={onTitle}
                label="Title" />
              <br />
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                value={description}
                onChange={onDes}
                rowsMax="4"
                variant="outlined"
              />
              <br />
              <TextField
                id="standard-basic"
                variant="outlined"
                value={subject}
                onChange={onSub}
                label="Subject" />
              <br></br>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={date}
                onChange={setDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <br />
              <Button type="submit" variant="contained">Add</Button>
            </form>
          </Grid>
        </MuiPickersUtilsProvider>
      </DialogContent>
    </Dialog>
  )
}
